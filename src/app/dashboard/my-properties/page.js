"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Home, Plus, Edit, Eye, Archive, Search, Filter } from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyPropertiesPage() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchMyProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [searchTerm, statusFilter, properties]);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/properties/my/properties");
      setProperties(response.data.data);
      setFilteredProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.city
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (property) => property.status === statusFilter,
      );
    }

    setFilteredProperties(filtered);
  };

  const handlePublishProperty = async (propertyId) => {
    try {
      await api.put(`/properties/${propertyId}/publish`);
      toast.success("Property published successfully");
      fetchMyProperties();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to publish property",
      );
    }
  };

  // Fix handleArchiveProperty - it should call archive endpoint, not delete
  const handleArchiveProperty = async (propertyId) => {
    if (!confirm("Are you sure you want to archive this property?")) return;

    try {
      await api.put(`/properties/${propertyId}/archive`);
      toast.success("Property archived successfully");
      fetchMyProperties(); //
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
      fetchMyProperties();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to revert to draft");
    }
  };
  const getStatusCount = (status) => {
    return properties.filter((p) => p.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Home className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Properties
                </h1>
                <p className="text-gray-600">
                  Manage all your property listings
                </p>
              </div>
            </div>
            <Link
              href="/properties/create"
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Link>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusFilter === "all"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All ({properties.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusFilter === "published"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Published ({getStatusCount("published")})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusFilter === "draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Draft ({getStatusCount("draft")})
            </button>
            <button
              onClick={() => setStatusFilter("archived")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                statusFilter === "archived"
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Archived ({getStatusCount("archived")})
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by title, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <div className="card p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No properties match your criteria"
                : "No properties yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter"
                : "Start by adding your first property"}
            </p>
            <Link href="/properties/create" className="btn-primary">
              Add Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="md:w-64 h-48 md:h-auto">
                    <img
                      src={property.images[0]?.url || "/placeholder.jpg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {property.title}
                          </h3>
                          <span
                            className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold ${
                              property.status === "published"
                                ? "bg-green-100 text-green-800"
                                : property.status === "draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{property.location.city}</span>
                          <span className="mx-2">•</span>
                          <span>{property.propertyType}</span>
                          <span className="mx-2">•</span>
                          <span>{property.bedrooms} beds</span>
                          <span className="mx-2">•</span>
                          <span>{property.bathrooms} baths</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ${property.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.views} views
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      {/* <Link
                        href={`/properties/${property._id}/edit`}
                        className="btn-outline flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link> */}
                      {property.status === "draft" && (
                        <button
                          onClick={() => handlePublishProperty(property._id)}
                          className="btn-primary flex items-center"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => handleArchiveProperty(property._id)}
                        className="btn-danger flex items-center"
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {properties.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Properties Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {properties.length}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {getStatusCount("published")}
                </div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {getStatusCount("draft")}
                </div>
                <div className="text-sm text-gray-600">Draft</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {getStatusCount("archived")}
                </div>
                <div className="text-sm text-gray-600">Archived</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
