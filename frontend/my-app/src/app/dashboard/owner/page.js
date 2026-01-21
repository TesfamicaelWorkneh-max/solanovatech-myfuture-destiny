"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {
  Home,
  Plus,
  Edit,
  Eye,
  Archive,
  X,
  Check,
  Upload,
  Trash2,
  Save,
  Loader2,
} from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OwnerDashboardPage() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
  });
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "apartment",
    amenities: [],
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  const fetchOwnerProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties/my/properties");
      const propertiesData = response.data.data;
      setProperties(propertiesData);

      // Calculate stats
      const total = propertiesData.length;
      const published = propertiesData.filter(
        (p) => p.status === "published",
      ).length;
      const draft = propertiesData.filter((p) => p.status === "draft").length;
      const archived = propertiesData.filter(
        (p) => p.status === "archived",
      ).length;

      setStats({ total, published, draft, archived });
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (property) => {
    if (property.status !== "draft" && property.status !== "archived") {
      toast.error("Only draft or archived properties can be edited");
      return;
    }

    setEditingProperty(property);

    // Set form data with proper nested structure
    setFormData({
      title: property.title || "",
      description: property.description || "",
      price: property.price?.toString() || "",
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area?.toString() || "",
      type: property.type || "apartment",
      amenities: Array.isArray(property.amenities) ? property.amenities : [],
      location: {
        address: property.location?.address || "",
        city: property.location?.city || "",
        state: property.location?.state || "",
        zipCode: property.location?.zipCode || "",
      },
    });

    setExistingImages(property.images || []);
    setImagePreviews(property.images?.map((img) => img.url) || []);
    setNewImages([]);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProperty(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      type: "apartment",
      amenities: [],
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    });
    setExistingImages([]);
    setImagePreviews([]);
    setNewImages([]);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(
          `${file.name} is not a valid image type (JPEG, PNG, WebP only)`,
        );
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }

      return true;
    });

    if (validFiles.length + imagePreviews.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setNewImages((prev) => [...prev, ...validFiles]);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const removeNewImage = (index) => {
    const newIndex = index - existingImages.length;
    setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Add amenity
  const addAmenity = () => {
    const input = document.getElementById("amenity-input");
    const amenity = input.value.trim();

    if (amenity) {
      if (!formData.amenities.includes(amenity)) {
        setFormData((prev) => ({
          ...prev,
          amenities: [...prev.amenities, amenity],
        }));
        toast.success("Amenity added");
      } else {
        toast.error("Amenity already exists");
      }
      input.value = "";
    }
  };

  // Remove amenity
  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission - FIXED FOR LOCATION OBJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      toast.error("Title, description, and price are required");
      return;
    }

    if (
      !formData.location.address ||
      !formData.location.city ||
      !formData.location.state
    ) {
      toast.error("Location address, city, and state are required");
      return;
    }

    setIsSaving(true);

    try {
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("type", formData.type);

      if (formData.bedrooms)
        formDataToSend.append("bedrooms", formData.bedrooms);
      if (formData.bathrooms)
        formDataToSend.append("bathrooms", formData.bathrooms);
      if (formData.area) formDataToSend.append("area", formData.area);

      // Add location as JSON string - IMPORTANT: Backend expects string
      formDataToSend.append("location", JSON.stringify(formData.location));

      // Add amenities as JSON string
      if (formData.amenities.length > 0) {
        formDataToSend.append("amenities", JSON.stringify(formData.amenities));
      }

      // Add images (combine existing and new)
      const allImages = [
        ...existingImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          isPrimary: img.isPrimary,
        })),
      ];

      // Add new images as files
      newImages.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // If we have existing images, send them as JSON
      if (allImages.length > 0) {
        formDataToSend.append("existingImages", JSON.stringify(allImages));
      }

      console.log("Updating property:", editingProperty._id);

      const response = await api.put(
        `/properties/${editingProperty._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Property updated successfully!");
      fetchOwnerProperties();
      closeEditModal();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update property");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishProperty = async (propertyId) => {
    try {
      await api.put(`/properties/${propertyId}/publish`);
      toast.success("Property published successfully");
      fetchOwnerProperties();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to publish property",
      );
    }
  };

  const handleArchiveProperty = async (propertyId) => {
    if (!confirm("Are you sure you want to archive this property?")) return;

    try {
      await api.put(`/properties/${propertyId}/archive`);
      toast.success("Property archived successfully");
      fetchOwnerProperties();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to archive property",
      );
    }
  };

  const handleRevertToDraft = async (propertyId) => {
    try {
      await api.put(`/properties/${propertyId}/draft`);
      toast.success("Property reverted to draft successfully");
      fetchOwnerProperties();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to revert to draft");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Owner Dashboard
            </h1>
            <p className="text-gray-600">Manage your properties and listings</p>
          </div>
          <Link
            href="/properties/create"
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">{stats.published}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-gray-100">
                <Archive className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-2xl font-bold">{stats.archived}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 text-center">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first property
              </p>
              <Link href="/properties/create" className="btn-primary">
                Add Property
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={
                                property.images?.[0]?.url || "/placeholder.jpg"
                              }
                              alt={property.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.location?.city || "Unknown location"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            property.status === "published"
                              ? "bg-green-100 text-green-800"
                              : property.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${property.price?.toLocaleString() || "0"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {property.views || 0}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        {/* <Link
                          href={`/properties/${property._id}`}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Property"
                        >
                          <Eye className="w-4 h-4 inline" />
                        </Link> */}

                        {/* Edit button - only for draft and archived properties */}
                        {(property.status === "draft" ||
                          property.status === "archived") && (
                          <button
                            onClick={() => openEditModal(property)}
                            className="text-yellow-600 hover:text-yellow-900 ml-2"
                            title="Quick Edit"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                        )}

                        {property.status === "draft" && (
                          <button
                            onClick={() => handlePublishProperty(property._id)}
                            className="text-green-600 hover:text-green-900 ml-2"
                            title="Publish"
                          >
                            Publish
                          </button>
                        )}

                        {property.status === "published" && (
                          <button
                            onClick={() => handleArchiveProperty(property._id)}
                            className="text-red-600 hover:text-red-900 ml-2"
                            title="Archive"
                          >
                            Archive
                          </button>
                        )}

                        {property.status === "archived" && (
                          <button
                            onClick={() => handleRevertToDraft(property._id)}
                            className="text-blue-600 hover:text-blue-900 ml-2"
                            title="Revert to Draft"
                          >
                            Draft
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeEditModal}
          ></div>

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white px-6 py-4 border-b z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Edit className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Edit Property: {editingProperty.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeEditModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Editing {editingProperty.status} property
                </p>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Basic Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Property Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="condo">Condo</option>
                          <option value="villa">Villa</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          step="0.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Area (sq ft)
                        </label>
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Location
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="location.state"
                          value={formData.location.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="location.zipCode"
                          value={formData.location.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Amenities
                    </h4>

                    <div className="flex mb-4">
                      <input
                        id="amenity-input"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mr-2"
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
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
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
                      {formData.amenities.length === 0 && (
                        <p className="text-gray-500 text-sm">
                          No amenities added yet
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Images</h4>
                      <label className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Add More Images
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    {imagePreviews.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No images uploaded</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (index < existingImages.length) {
                                  removeExistingImage(index);
                                } else {
                                  removeNewImage(index);
                                }
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                Primary
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-4">
                      {imagePreviews.length} of 10 images uploaded
                    </p>
                  </div>

                  {/* Modal Footer */}
                  <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
