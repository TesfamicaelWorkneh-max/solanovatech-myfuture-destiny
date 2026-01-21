// import Property from "../models/Property.js";
// import User from "../models/User.js";

// // @desc    Get system metrics
// // @route   GET /api/admin/metrics
// // @access  Private (Admin role)
// export const getSystemMetrics = async (req, res, next) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalProperties = await Property.countDocuments();

//     const propertiesByStatus = await Property.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const usersByRole = await User.aggregate([
//       {
//         $group: {
//           _id: "$role",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const recentProperties = await Property.find()
//       .sort("-createdAt")
//       .limit(5)
//       .populate("owner", "name email");

//     res.status(200).json({
//       success: true,
//       data: {
//         totalUsers,
//         totalProperties,
//         propertiesByStatus,
//         usersByRole,
//         recentProperties,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get all users
// // @route   GET /api/admin/users
// // @access  Private (Admin role)
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().select("-password");

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get all properties (including deleted)
// // @route   GET /api/admin/properties
// // @access  Private (Admin role)
// export const getAllProperties = async (req, res, next) => {
//   try {
//     // Remove the pre hook filter to get all properties
//     const properties = await Property.find()
//       .populate("owner", "name email")
//       .sort("-createdAt");

//     res.status(200).json({
//       success: true,
//       count: properties.length,
//       data: properties,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Disable property (admin only)
// // @route   PUT /api/admin/properties/:id/disable
// // @access  Private (Admin role)
// export const disableProperty = async (req, res, next) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     property.status = "archived";
//     property.deletedAt = new Date();
//     await property.save();

//     res.status(200).json({
//       success: true,
//       message: "Property disabled successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Disable user account
// // @route   PUT /api/admin/users/:id/disable
// // @access  Private (Admin role)
// export const disableUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Prevent disabling admin accounts
//     if (
//       user.role === "admin" &&
//       user._id.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Cannot disable other admin accounts",
//       });
//     }

//     await user.softDelete();

//     res.status(200).json({
//       success: true,
//       message: "User account disabled successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Enable user account
// // @route   PUT /api/admin/users/:id/enable
// // @access  Private (Admin role)
// export const enableUser = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { deletedAt: null },
//       { new: true },
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User account enabled successfully",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update user role
// // @route   PUT /api/admin/users/:id/role
// // @access  Private (Admin role)
// export const updateUserRole = async (req, res, next) => {
//   try {
//     const { role } = req.body;

//     if (!["user", "owner", "admin"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role specified",
//       });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true },
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User role updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
import Property from "../models/Property.js";
import User from "../models/User.js";

// @desc    Get all properties for admin (with all statuses)
// @route   GET /api/admin/properties
// @access  Private (Admin only)
export const getAdminProperties = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    // Parse query string
    let query = Property.find(JSON.parse(queryStr));

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Count total
    const total = await Property.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Execute query with owner population
    const properties = await query.populate("owner", "name email phone");

    // Format location for frontend
    const formattedProperties = properties.map((property) => ({
      ...property.toObject(),
      locationString: property.location
        ? `${property.location.address}, ${property.location.city}, ${property.location.state}`
        : "No location",
    }));

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: formattedProperties.length,
      pagination,
      data: formattedProperties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAdminUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .select("-password") // Exclude password
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Disable/Enable user (admin only)
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private (Admin only)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't allow admin to disable themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Cannot disable your own account",
      });
    }

    // Toggle deletedAt field
    user.deletedAt = user.deletedAt ? null : new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: user.deletedAt
        ? "User disabled successfully"
        : "User enabled successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive property (admin only - can archive any property)
// @route   PUT /api/admin/properties/:id/archive
// @access  Private (Admin only)
export const adminArchiveProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Admin can archive any property regardless of status
    property.status = "archived";
    property.archivedAt = new Date();
    await property.save();

    res.status(200).json({
      success: true,
      message: "Property archived successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system metrics for admin dashboard
// @route   GET /api/admin/metrics
// @access  Private (Admin only)
export const getSystemMetrics = async (req, res, next) => {
  try {
    // Get total counts
    const totalProperties = await Property.countDocuments({ deletedAt: null });
    const totalUsers = await User.countDocuments({ deletedAt: null });
    const totalOwners = await User.countDocuments({
      role: "owner",
      deletedAt: null,
    });
    const totalRegularUsers = await User.countDocuments({
      role: "user",
      deletedAt: null,
    });
    const totalAdmins = await User.countDocuments({
      role: "admin",
      deletedAt: null,
    });

    // Get property status counts
    const publishedProperties = await Property.countDocuments({
      status: "published",
      deletedAt: null,
    });
    const draftProperties = await Property.countDocuments({
      status: "draft",
      deletedAt: null,
    });
    const archivedProperties = await Property.countDocuments({
      status: "archived",
      deletedAt: null,
    });

    // Get recent activities
    const recentProperties = await Property.find({ deletedAt: null })
      .sort("-createdAt")
      .limit(5)
      .populate("owner", "name email");

    const recentUsers = await User.find({ deletedAt: null })
      .sort("-createdAt")
      .limit(5)
      .select("name email role createdAt");

    // Get statistics
    const totalViews = await Property.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]);

    const avgPrice = await Property.aggregate([
      { $match: { deletedAt: null, status: "published" } },
      { $group: { _id: null, avg: { $avg: "$price" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          properties: totalProperties,
          users: totalUsers,
          owners: totalOwners,
          regularUsers: totalRegularUsers,
          admins: totalAdmins,
          published: publishedProperties,
          draft: draftProperties,
          archived: archivedProperties,
        },
        statistics: {
          totalViews: totalViews[0]?.total || 0,
          avgPrice: avgPrice[0]?.avg ? Math.round(avgPrice[0].avg) : 0,
        },
        recent: {
          properties: recentProperties,
          users: recentUsers,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
