"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus } from "lucide-react";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Update schema to match backend model
const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  type: z.enum(["apartment", "house", "condo", "villa", "commercial"]),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  area: z.coerce.number().min(0).optional(),
  location: z.object({
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().optional(),
  }),
  amenities: z.array(z.string()).optional(),
  propertyType: z.string().optional(), // Add this if your model has both
});

export default function PropertyForm({ initialData }) {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    initialData?.images?.map((img) => img.url) || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: initialData.price,
          type: initialData.type || initialData.propertyType,
        }
      : {
          type: "apartment",
          location: {
            address: "",
            city: "",
            state: "",
            zipCode: "",
          },
          amenities: [],
        },
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(
          `${file.name} is not a valid image type (JPEG, PNG, WebP, GIF only)`,
        );
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }

      return true;
    });

    if (validFiles.length + images.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result]);
      };
      reader.readAsDataURL(file);
    });

    setImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    const input = document.getElementById("amenity-input");
    const amenity = input.value.trim();
    if (amenity) {
      const currentAmenities = getValues("amenities") || [];
      // Check if amenity already exists
      if (!currentAmenities.includes(amenity)) {
        setValue("amenities", [...currentAmenities, amenity]);
        toast.success("Amenity added");
      } else {
        toast.error("Amenity already exists");
      }
      input.value = "";
    }
  };

  const removeAmenity = (index) => {
    const currentAmenities = getValues("amenities") || [];
    setValue(
      "amenities",
      currentAmenities.filter((_, i) => i !== index),
    );
  };

  // In your PropertyForm component - modify the onSubmit function:
  const onSubmit = async (data) => {
    if (images.length === 0 && imagePreviews.length === 0 && !initialData) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add simple text fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("type", data.type);

      // ADD THIS LINE: Set status to published immediately
      formData.append("status", "published");

      // ... rest of your form data ...

      console.log("Creating property...");

      let response;
      if (initialData) {
        // Update existing property
        response = await api.put(`/properties/${initialData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property updated successfully");
      } else {
        // Create new property
        response = await api.post("/properties", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property created successfully");

        // Immediately publish the property
        const propertyId = response.data.data._id;
        try {
          await api.put(`/properties/${propertyId}/publish`);
          toast.success("Property published successfully");
        } catch (publishError) {
          console.error("Could not publish:", publishError);
          toast.error("Property created but could not publish automatically");
        }
      }

      console.log("Response:", response.data);

      // Redirect to property page only if it's published
      if (response.data.data?._id) {
        router.push(`/properties/${response.data.data._id}`);
      } else {
        router.push("/dashboard/my-properties");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to save property. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Property Title*</label>
            <input
              type="text"
              className={`input-field ${errors.title ? "border-red-500" : ""}`}
              placeholder="e.g., Modern 3-Bedroom Apartment"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Property Type*</label>
            <select
              className={`input-field ${errors.type ? "border-red-500" : ""}`}
              {...register("type")}
            >
              <option value="">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="label">Price* ($)</label>
            <input
              type="number"
              step="0.01"
              className={`input-field ${errors.price ? "border-red-500" : ""}`}
              placeholder="e.g., 250000"
              {...register("price")}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Bedrooms</label>
              <input
                type="number"
                min="0"
                className="input-field"
                placeholder="0"
                {...register("bedrooms")}
              />
            </div>
            <div>
              <label className="label">Bathrooms</label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="input-field"
                placeholder="0"
                {...register("bathrooms")}
              />
            </div>
          </div>

          <div>
            <label className="label">Area (sq ft)</label>
            <input
              type="number"
              min="0"
              className="input-field"
              placeholder="e.g., 1500"
              {...register("area")}
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Description*</label>
            <textarea
              className={`input-field min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
              placeholder="Describe your property in detail..."
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="label">Address*</label>
            <input
              type="text"
              className={`input-field ${errors.location?.address ? "border-red-500" : ""}`}
              placeholder="Street address"
              {...register("location.address")}
            />
            {errors.location?.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">City*</label>
            <input
              type="text"
              className={`input-field ${errors.location?.city ? "border-red-500" : ""}`}
              placeholder="City"
              {...register("location.city")}
            />
            {errors.location?.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">State*</label>
            <input
              type="text"
              className={`input-field ${errors.location?.state ? "border-red-500" : ""}`}
              placeholder="State"
              {...register("location.state")}
            />
            {errors.location?.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">ZIP Code</label>
            <input
              type="text"
              className="input-field"
              placeholder="ZIP code"
              {...register("location.zipCode")}
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Images</h2>
        <p className="text-gray-600 mb-4">
          Upload high-quality photos of your property (max 10 images, 5MB each)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Image upload button */}
          <label className="relative cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors flex flex-col items-center justify-center p-4">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 text-center">
                Upload Images ({images.length + imagePreviews.length}/10)
              </span>
            </div>
          </label>

          {/* Image previews */}
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-square group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
        {images.length === 0 && imagePreviews.length === 0 && (
          <p className="mt-4 text-red-500 text-sm">
            At least one image is required
          </p>
        )}
      </div>

      {/* Amenities */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities</h2>

        <div className="flex mb-4">
          <input
            id="amenity-input"
            type="text"
            className="input-field flex-1 mr-2"
            placeholder="e.g., Swimming Pool, Gym, Parking"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAmenity();
              }
            }}
          />
          <button
            type="button"
            onClick={addAmenity}
            className="btn-secondary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {getValues("amenities")?.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm">{amenity}</span>
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {(!getValues("amenities") || getValues("amenities").length === 0) && (
            <p className="text-gray-500 text-sm">No amenities added yet</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : initialData ? (
            "Update Property"
          ) : (
            "Create Property"
          )}
        </button>
      </div>
    </form>
  );
}
