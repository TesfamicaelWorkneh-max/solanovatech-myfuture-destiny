export const checkOwnership = (model, paramName = "id") => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params[paramName]);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      // Allow admins to access everything
      if (req.user.role === "admin") {
        req.resource = resource;
        return next();
      }

      // Check if user owns the resource
      if (resource.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};
