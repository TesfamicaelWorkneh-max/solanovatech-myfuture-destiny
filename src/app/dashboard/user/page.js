"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { User, Heart, Clock, Settings, Eye, Home } from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log("Fetching dashboard data for user:", user?.id);

      // Fetch favorite properties with full details
      const favoritesResponse = await api.get("/properties/favorites/my");
      console.log("Favorites response:", favoritesResponse.data);
      setFavoriteProperties(favoritesResponse.data.data || []);

      // Fetch recent properties
      const recentResponse = await api.get(
        "/properties?limit=6&status=published&sort=-createdAt",
      );
      console.log("Recent properties:", recentResponse.data.data?.length || 0);
      setRecentProperties(recentResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Simple Property Card for dashboard
  const PropertyCard = ({ property }) => (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={property.images?.[0]?.url || "/placeholder.jpg"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {property.location?.city}, {property.location?.state}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary-600">
            ${property.price?.toLocaleString()}
          </span>
          <Link
            href={`/properties/${property._id}`}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Link>
        </div>
      </div>
    </div>
  );

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
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your personal dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary-100">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="text-lg font-semibold capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-pink-100">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-lg font-semibold">
                  {favoriteProperties.length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
            <Link
              href="/dashboard/favorites"
              className="text-primary-600 hover:text-primary-800 flex items-center"
            >
              <Heart className="w-4 h-4 mr-1" />
              View All
            </Link>
          </div>

          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start exploring properties and add them to your favorites!
              </p>
              <Link href="/properties" className="btn-primary">
                Browse Properties
              </Link>
            </div>
          )}
        </div>

        {/* Recent Properties */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recently Added Properties
            </h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>

          {recentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties available
              </h3>
              <p className="text-gray-600">
                Check back later for new properties
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
