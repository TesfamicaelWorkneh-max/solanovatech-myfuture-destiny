"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Home, Shield, Eye, Archive, RefreshCw } from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPropertiesPage() {
  const { user } = useAuthStore();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/properties");
      setProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleArchiveProperty = async (propertyId) => {
    if (!confirm("Are you sure you want to archive this property?")) return;

    try {
      await api.put(`/admin/properties/${propertyId}/archive`);
      toast.success("Property archived successfully");
      fetchProperties();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to archive property",
      );
    }
  };

  // Function to format location object to string
  const formatLocation = (location) => {
    if (!location) return "No location";

    if (typeof location === "string") return location;

    if (typeof location === "object") {
      const parts = [];
      if (location.address) parts.push(location.address);
      if (location.city) parts.push(location.city);
      if (location.state) parts.push(location.state);
      return parts.join(", ");
    }

    return "Unknown location";
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
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Home className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Manage Properties
                </h1>
                <p className="text-gray-600">
                  View and manage all properties on the platform.
                </p>
              </div>
            </div>
            <button
              onClick={fetchProperties}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        <div className="card p-6">
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                There are no properties in the system yet.
              </p>
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
                      Owner
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
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* FIXED: Format location object */}
                          {formatLocation(property.location)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {property.owner?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.owner?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            property.status === "published"
                              ? "bg-green-100 text-green-800"
                              : property.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : property.status === "archived"
                                  ? "bg-red-100 text-red-800"
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
                        >
                          <Eye className="w-4 h-4 inline mr-1" />
                          View
                        </Link> */}
                        <button
                          onClick={() => handleArchiveProperty(property._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Archive className="w-4 h-4 inline mr-1" />
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
