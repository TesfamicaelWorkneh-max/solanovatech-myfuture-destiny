"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Heart, Home, MapPin, Bed, Bath, Trash2, Search } from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      console.log("Fetching favorite properties...");

      const response = await api.get("/properties/favorites/my");
      console.log("Favorites response:", response.data);

      setFavorites(response.data.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error(
        error.response?.data?.message || "Failed to load favorite properties",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await api.delete(`/properties/${propertyId}/favorite`);
      toast.success("Removed from favorites");

      setFavorites(favorites.filter((fav) => fav._id !== propertyId));

      useAuthStore.setState((state) => ({
        ...state,
        user: {
          ...state.user,
          favorites:
            state.user?.favorites?.filter((id) => id !== propertyId) || [],
        },
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove from favorites",
      );
    }
  };

  console.log("Current favorites state:", favorites);

  const filteredFavorites = favorites.filter(
    (fav) =>
      fav.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-lg bg-pink-100">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-gray-600">
                {favorites.length} saved{" "}
                {favorites.length === 1 ? "property" : "properties"}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your favorite properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="card p-12 text-center">
            {searchTerm ? (
              <>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No matching favorites found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search term
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              </>
            ) : favorites.length === 0 ? (
              <>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by exploring properties and adding them to your
                  favorites
                </p>
                <Link href="/properties" className="btn-primary">
                  Browse Properties
                </Link>
              </>
            ) : (
              <>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No properties match your filter
                </h3>
                <p className="text-gray-600 mb-6">Try clearing your search</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredFavorites.map((property) => (
                <div
                  key={property._id}
                  className="card overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Property Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images?.[0]?.url || "/placeholder.jpg"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleRemoveFavorite(property._id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    {property.isFeatured && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        <Link
                          href={`/properties/${property._id}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {property.title}
                        </Link>
                      </h3>
                      <div className="text-lg font-bold text-primary-600">
                        ${property.price?.toLocaleString() || "N/A"}
                        <span className="text-sm text-gray-500 font-normal">
                          /month
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm truncate">
                        {property.location?.city || "Location not specified"},{" "}
                        {property.location?.state || ""}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Property Features */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                          <Bed className="w-4 h-4 mr-1" />
                          <span className="text-sm">
                            {property.bedrooms || 0}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Bath className="w-4 h-4 mr-1" />
                          <span className="text-sm">
                            {property.bathrooms || 0}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {property.area || 0} sqft
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.propertyType || "N/A"}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex space-x-2">
                      <Link
                        href={`/properties/${property._id}`}
                        className="flex-1 btn-primary text-center py-2"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(property._id)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Favorites Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {favorites.filter((p) => p.propertyType === "house").length}
                  </div>
                  <div className="text-sm text-gray-600">Houses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      favorites.filter((p) => p.propertyType === "apartment")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Apartments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {favorites.filter((p) => p.isFeatured).length}
                  </div>
                  <div className="text-sm text-gray-600">Featured</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <div className="mt-8 card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                Compare Properties
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                Contact Multiple Owners
              </button>
              <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                Download List
              </button>
              <Link
                href="/properties"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Browse More Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
