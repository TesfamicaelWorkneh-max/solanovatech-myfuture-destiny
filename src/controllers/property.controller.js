// import Property from "../models/Property.js";
// import User from "../models/User.js";
// import mongoose from "mongoose";

// // @desc    Get all properties (with filtering, sorting, pagination)
// // @route   GET /api/properties
// // @access  Public
// export const getProperties = async (req, res, next) => {
//   try {
//     // Copy req.query
//     const reqQuery = { ...req.query };

//     // Fields to exclude
//     const removeFields = ["select", "sort", "page", "limit"];
//     removeFields.forEach((param) => delete reqQuery[param]);

//     // Create query string
//     let queryStr = JSON.stringify(reqQuery);

//     // Create operators ($gt, $gte, etc)
//     queryStr = queryStr.replace(
//       /\b(gt|gte|lt|lte|in)\b/g,
//       (match) => `$${match}`,
//     );

//     // Parse query string
//     let query = Property.find(JSON.parse(queryStr));

//     // Select fields
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     // Sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const total = await Property.countDocuments(JSON.parse(queryStr));

//     query = query.skip(startIndex).limit(limit);

//     // Execute query
//     const properties = await query.populate("owner", "name email phone");

//     // Pagination result
//     const pagination = {};

//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit,
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }

//     res.status(200).json({
//       success: true,
//       count: properties.length,
//       pagination,
//       data: properties,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get single property
// // @route   GET /api/properties/:id
// // @access  Public
// export const getProperty = async (req, res, next) => {
//   try {
//     // Increment views
//     await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

//     const property = await Property.findById(req.params.id).populate(
//       "owner",
//       "name email phone",
//     );

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: property,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Create new property
// // @route   POST /api/properties
// // @access  Private (Owner role)
// // controllers/property.controller.js - createProperty function

// // @desc    Create new property
// // @route   POST /api/properties
// // @access  Private (Owner role)
// // controllers/property.controller.js - createProperty function
// export const createProperty = async (req, res, next) => {
//   console.log("=== Creating Property ===");
//   console.log("Files received:", req.files?.length || 0);

//   try {
//     // Add owner to req.body
//     req.body.owner = req.user.id;

//     // Process files if any
//     if (req.files && req.files.length > 0) {
//       console.log("Processing uploaded files...");

//       req.body.images = req.files.map((file, index) => {
//         // Check if file has Cloudinary data or memory data
//         if (file.path && file.filename) {
//           return {
//             url: file.path,
//             publicId: file.filename,
//             isPrimary: index === 0,
//           };
//         } else if (file.buffer) {
//           // Convert buffer to base64 data URL
//           const base64 = file.buffer.toString("base64");
//           const dataUrl = `data:${file.mimetype};base64,${base64}`;

//           return {
//             url: dataUrl,
//             publicId: `temp_${Date.now()}_${index}`,
//             isPrimary: index === 0,
//           };
//         } else {
//           // Fallback placeholder
//           return {
//             url: "/placeholder.jpg",
//             publicId: `placeholder_${index}`,
//             isPrimary: index === 0,
//           };
//         }
//       });
//     } else {
//       req.body.images = [];
//     }

//     // Ensure location is an object
//     if (typeof req.body.location === "string") {
//       try {
//         req.body.location = JSON.parse(req.body.location);
//       } catch (e) {
//         req.body.location = {};
//       }
//     }

//     // Convert price to number
//     if (req.body.price) {
//       req.body.price = parseFloat(req.body.price);
//     }

//     console.log("Creating property with:", {
//       title: req.body.title,
//       price: req.body.price,
//       images: req.body.images?.length || 0,
//     });

//     const property = await Property.create(req.body);

//     res.status(201).json({
//       success: true,
//       data: property,
//     });
//   } catch (error) {
//     console.error("Create property error:", error);
//     next(error);
//   }
// };
// // @desc    Update property
// // @route   PUT /api/properties/:id
// // @access  Private (Owner role)
// export const updateProperty = async (req, res, next) => {
//   try {
//     let property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     // Check if property is published (can't edit published properties)
//     if (property.status === "published") {
//       return res.status(400).json({
//         success: false,
//         message: "Published properties cannot be edited",
//       });
//     }

//     // Handle image uploads if new images are provided
//     if (req.files && req.files.length > 0) {
//       const newImages = req.files.map((file, index) => ({
//         url: file.path,
//         publicId: file.filename,
//         isPrimary: index === 0,
//       }));

//       // Combine with existing images or replace
//       if (req.body.replaceImages === "true") {
//         req.body.images = newImages;
//       } else {
//         req.body.images = [...property.images, ...newImages];
//       }
//     }

//     property = await Property.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       data: property,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Delete property (soft delete)
// // @route   DELETE /api/properties/:id
// // @access  Private (Owner role)
// export const deleteProperty = async (req, res, next) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     await property.softDelete();

//     res.status(200).json({
//       success: true,
//       message: "Property deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Publish property (with transaction)
// // @route   PUT /api/properties/:id/publish
// // @access  Private (Owner role)
// export const publishProperty = async (req, res, next) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const property = await Property.findById(req.params.id).session(session);

//     if (!property) {
//       await session.abortTransaction();
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     // Validate property before publishing
//     if (!property.images || property.images.length === 0) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "Property must have at least one image to publish",
//       });
//     }

//     // Check required fields
//     const requiredFields = [
//       "title",
//       "description",
//       "price",
//       "location.address",
//     ];
//     const missingFields = requiredFields.filter((field) => {
//       const value = property[field];
//       return value === undefined || value === null || value === "";
//     });

//     if (missingFields.length > 0) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: `Missing required fields: ${missingFields.join(", ")}`,
//       });
//     }

//     // Publish property
//     property.status = "published";
//     await property.save({ session });

//     await session.commitTransaction();

//     res.status(200).json({
//       success: true,
//       message: "Property published successfully",
//       data: property,
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     next(error);
//   } finally {
//     session.endSession();
//   }
// };

// // @desc    Get user's properties
// // @route   GET /api/properties/my-properties
// // @access  Private (Owner role)
// export const getMyProperties = async (req, res, next) => {
//   try {
//     const properties = await Property.find({ owner: req.user.id });

//     res.status(200).json({
//       success: true,
//       count: properties.length,
//       data: properties,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Add property to favorites
// // @route   POST /api/properties/:id/favorite
// // @access  Private (User role)
// export const addToFavorites = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);

//     // Check if already in favorites
//     if (user.favorites.includes(req.params.id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Property already in favorites",
//       });
//     }

//     user.favorites.push(req.params.id);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Property added to favorites",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Remove property from favorites
// // @route   DELETE /api/properties/:id/favorite
// // @access  Private (User role)
// export const removeFromFavorites = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);

//     user.favorites = user.favorites.filter(
//       (favorite) => favorite.toString() !== req.params.id,
//     );

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Property removed from favorites",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get user's favorite properties
// // @route   GET /api/properties/favorites
// // @access  Private (User role)
// export const getFavorites = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate("favorites");

//     res.status(200).json({
//       success: true,
//       count: user.favorites.length,
//       data: user.favorites,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Search properties
// // @route   GET /api/properties/search
// // @access  Public
// export const searchProperties = async (req, res, next) => {
//   try {
//     const { location, minPrice, maxPrice, type, bedrooms, status } = req.query;

//     const query = {};

//     // Build search query
//     if (location) {
//       query["location.city"] = new RegExp(location, "i");
//     }

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     if (type) {
//       query.type = type;
//     }

//     if (bedrooms) {
//       query.bedrooms = { $gte: Number(bedrooms) };
//     }

//     if (status) {
//       query.status = status;
//     } else {
//       query.status = "published"; // Default to published
//     }

//     const properties = await Property.find(query)
//       .populate("owner", "name email phone")
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
import Property from "../models/Property.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// @desc    Get all properties (with filtering, sorting, pagination)
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit", "status"];
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

    // For public access, only show published properties
    if (!req.user || req.user.role !== "owner") {
      query = query.where({ status: "published" });
    }

    // Filter by status if provided and user is owner/admin
    if (
      req.query.status &&
      (req.user?.role === "owner" || req.user?.role === "admin")
    ) {
      query = query.where({ status: req.query.status });
    }

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

    // Count total (without pagination)
    const countQuery = Property.find(JSON.parse(queryStr));
    if (!req.user || req.user.role !== "owner") {
      countQuery.where({ status: "published" });
    }
    if (
      req.query.status &&
      (req.user?.role === "owner" || req.user?.role === "admin")
    ) {
      countQuery.where({ status: req.query.status });
    }
    const total = await countQuery.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const properties = await query.populate("owner", "name email phone");

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
      count: properties.length,
      pagination,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email phone",
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if property is published (for non-owners)
    if (property.status !== "published") {
      // If user is not the owner or admin, don't show draft/archived properties
      if (
        !req.user ||
        (req.user.id !== property.owner._id.toString() &&
          req.user.role !== "admin")
      ) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Owner role)
export const createProperty = async (req, res, next) => {
  console.log("=== Creating Property ===");
  console.log("Files received:", req.files?.length || 0);

  try {
    // Add owner to req.body
    req.body.owner = req.user.id;
    req.body.status = "draft"; // Always start as draft

    // Process files if any
    if (req.files && req.files.length > 0) {
      console.log("Processing uploaded files...");

      req.body.images = req.files.map((file, index) => {
        // Check if file has Cloudinary data or memory data
        if (file.path && file.filename) {
          return {
            url: file.path,
            publicId: file.filename,
            isPrimary: index === 0,
          };
        } else if (file.buffer) {
          // Convert buffer to base64 data URL
          const base64 = file.buffer.toString("base64");
          const dataUrl = `data:${file.mimetype};base64,${base64}`;

          return {
            url: dataUrl,
            publicId: `temp_${Date.now()}_${index}`,
            isPrimary: index === 0,
          };
        } else {
          // Fallback placeholder
          return {
            url: "/placeholder.jpg",
            publicId: `placeholder_${index}`,
            isPrimary: index === 0,
          };
        }
      });
    } else {
      req.body.images = [];
    }

    // Ensure location is an object
    if (typeof req.body.location === "string") {
      try {
        req.body.location = JSON.parse(req.body.location);
      } catch (e) {
        req.body.location = {};
      }
    }

    // Convert price to number
    if (req.body.price) {
      req.body.price = parseFloat(req.body.price);
    }

    console.log("Creating property with:", {
      title: req.body.title,
      price: req.body.price,
      images: req.body.images?.length || 0,
      status: req.body.status,
    });

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Create property error:", error);
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner role)
export const updateProperty = async (req, res, next) => {
  // In updateProperty function - add this at the beginning:
  if (typeof req.body.location === "string") {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (e) {
      req.body.location = {};
    }
  }

  if (typeof req.body.amenities === "string") {
    try {
      req.body.amenities = JSON.parse(req.body.amenities);
    } catch (e) {
      req.body.amenities = [];
    }
  }

  if (req.body.existingImages && typeof req.body.existingImages === "string") {
    try {
      req.body.existingImages = JSON.parse(req.body.existingImages);
    } catch (e) {
      req.body.existingImages = [];
    }
  }
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this property",
      });
    }

    // Check if property is published (can't edit published properties)
    if (property.status === "published") {
      return res.status(400).json({
        success: false,
        message:
          "Published properties cannot be edited. Please archive it first to edit.",
      });
    }

    // Don't allow status changes via update - use dedicated endpoints
    if (req.body.status && req.body.status !== property.status) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot change status via update. Use publish/archive/draft endpoints.",
      });
    }

    // Handle image uploads if new images are provided
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isPrimary:
          index === 0 && (!property.images || property.images.length === 0),
      }));

      // Combine with existing images or replace
      if (req.body.replaceImages === "true") {
        req.body.images = newImages;
      } else {
        req.body.images = [...(property.images || []), ...newImages];
      }
    }

    // Update property
    property = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property (soft delete)
// @route   DELETE /api/properties/:id
// @access  Private (Owner role)
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this property",
      });
    }

    await property.softDelete();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish property
// @route   PUT /api/properties/:id/publish
// @access  Private (Owner role)
export const publishProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to publish this property",
      });
    }

    // Check if already published
    if (property.status === "published") {
      return res.status(400).json({
        success: false,
        message: "Property is already published",
      });
    }

    // Check if property is in draft
    if (property.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only draft properties can be published",
      });
    }

    // Validate property before publishing
    if (!property.images || property.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Property must have at least one image to publish",
      });
    }

    // Check required fields
    const requiredFields = ["title", "description", "price"];
    const missingFields = requiredFields.filter((field) => {
      const value = property[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Publish property
    property.status = "published";
    property.publishedAt = new Date();
    await property.save();

    res.status(200).json({
      success: true,
      message: "Property published successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive property
// @route   PUT /api/properties/:id/archive
// @access  Private (Owner role)
export const archiveProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to archive this property",
      });
    }

    // Check if already archived
    if (property.status === "archived") {
      return res.status(400).json({
        success: false,
        message: "Property is already archived",
      });
    }

    // Check if property is published
    if (property.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "Only published properties can be archived",
      });
    }

    // Archive property
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

// @desc    Revert property to draft
// @route   PUT /api/properties/:id/draft
// @access  Private (Owner role)
export const revertToDraft = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check ownership
    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this property",
      });
    }

    // Check if already in draft
    if (property.status === "draft") {
      return res.status(400).json({
        success: false,
        message: "Property is already in draft",
      });
    }

    // Check if property is archived
    if (property.status !== "archived") {
      return res.status(400).json({
        success: false,
        message: "Only archived properties can be reverted to draft",
      });
    }

    // Revert to draft
    property.status = "draft";
    property.archivedAt = null;
    await property.save();

    res.status(200).json({
      success: true,
      message: "Property reverted to draft successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's properties
// @route   GET /api/properties/my/properties
// @access  Private (Owner role)
export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({
      owner: req.user.id,
      deletedAt: null, // Exclude soft-deleted properties
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add property to favorites
// @route   POST /api/properties/:id/favorite
// @access  Private (User role)
export const addToFavorites = async (req, res, next) => {
  try {
    console.log(
      "Adding to favorites - User:",
      req.user.id,
      "Property:",
      req.params.id,
    );

    const user = await User.findById(req.user.id);

    // Check if property exists
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if already in favorites
    if (user.favorites.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Property already in favorites",
      });
    }

    user.favorites.push(req.params.id);
    await user.save();

    console.log(
      "Added to favorites. User now has:",
      user.favorites.length,
      "favorites",
    );

    res.status(200).json({
      success: true,
      message: "Property added to favorites",
      favoritesCount: user.favorites.length,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    next(error);
  }
};

// @desc    Remove property from favorites
// @route   DELETE /api/properties/:id/favorite
// @access  Private (User role)
export const removeFromFavorites = async (req, res, next) => {
  try {
    console.log(
      "Removing from favorites - User:",
      req.user.id,
      "Property:",
      req.params.id,
    );

    const user = await User.findById(req.user.id);

    const initialCount = user.favorites.length;
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== req.params.id,
    );

    await user.save();

    console.log(
      "Removed from favorites. User now has:",
      user.favorites.length,
      "favorites",
    );

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
      favoritesCount: user.favorites.length,
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    next(error);
  }
};

// @desc    Get user's favorite properties
// @route   GET /api/properties/favorites/my
// @access  Private (User role)
export const getFavorites = async (req, res, next) => {
  try {
    console.log("Getting favorites for user:", req.user.id);

    const user = await User.findById(req.user.id).populate({
      path: "favorites",
      match: { deletedAt: null }, // Only get non-deleted properties
      populate: {
        path: "owner",
        select: "name email phone",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Found favorites:", user.favorites.length);

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites,
    });
  } catch (error) {
    console.error("Error getting favorites:", error);
    next(error);
  }
};

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
export const searchProperties = async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice, type, bedrooms, status } = req.query;

    const query = { deletedAt: null };

    // Build search query
    if (location) {
      query["location.city"] = new RegExp(location, "i");
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (type) {
      query.type = type;
    }

    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    if (status && (req.user?.role === "owner" || req.user?.role === "admin")) {
      query.status = status;
    } else {
      query.status = "published"; // Default to published for public
    }

    const properties = await Property.find(query)
      .populate("owner", "name email phone")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get property statistics for dashboard
// @route   GET /api/properties/stats
// @access  Private (Owner/Admin)
export const getPropertyStats = async (req, res, next) => {
  try {
    const query = { deletedAt: null };

    // If not admin, only show owner's properties
    if (req.user.role !== "admin") {
      query.owner = req.user.id;
    }

    const stats = await Property.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          avgPrice: { $avg: "$price" },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          totalViews: 1,
          avgPrice: { $round: ["$avgPrice", 2] },
        },
      },
    ]);

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        total,
        stats,
      },
    });
  } catch (error) {
    next(error);
  }
};
