// const mongoose = require('mongoose');
import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "condo", "villa", "commercial"],
      default: "apartment",
    },
    bedrooms: {
      type: Number,
      min: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
    },
    area: {
      type: Number, // in square feet/meters
      min: 0,
    },
    amenities: [String],
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Soft delete method
propertySchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  this.status = "archived";
  return this.save();
};

// Publish method with validation
propertySchema.methods.publish = function () {
  if (!this.images || this.images.length === 0) {
    throw new Error("Property must have at least one image to publish");
  }
  if (
    !this.title ||
    !this.description ||
    !this.price ||
    !this.location.address
  ) {
    throw new Error("Required fields are missing");
  }

  this.status = "published";
  return this.save();
};

// Exclude deleted properties from queries
propertySchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

// Indexes for better query performance
propertySchema.index({ status: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ createdAt: -1 });

export default mongoose.model("Property", propertySchema);
