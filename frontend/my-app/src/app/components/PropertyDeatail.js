"use client";

import { useState, useEffect } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PropertyDetail({ property }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if property is in user's favorites
  useEffect(() => {
    if (user && property) {
      const favorite = user.favorites?.includes(property._id);
      setIsFavorite(favorite);
      console.log(
        "Property is favorite:",
        favorite,
        "User favorites:",
        user.favorites,
      );
    }
  }, [user, property]);

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Please login to add favorites");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await api.delete(`/properties/${property._id}/favorite`);
        toast.success("Removed from favorites");

        // Update local state
        setIsFavorite(false);

        // Update user store
        useAuthStore.setState((state) => ({
          ...state,
          user: {
            ...state.user,
            favorites: state.user.favorites.filter((id) => id !== property._id),
          },
        }));
      } else {
        // Add to favorites
        await api.post(`/properties/${property._id}/favorite`);
        toast.success("Added to favorites");

        // Update local state
        setIsFavorite(true);

        // Update user store
        useAuthStore.setState((state) => ({
          ...state,
          user: {
            ...state.user,
            favorites: [...state.user.favorites, property._id],
          },
        }));
      }
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update favorites",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: property.title,
        text: property.description?.substring(0, 100) || "",
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleContact = () => {
    if (!user) {
      toast.error("Please login to contact owner");
      router.push("/login");
      return;
    }

    if (property.owner?.email) {
      window.location.href = `mailto:${property.owner.email}?subject=Regarding ${property.title}`;
    } else {
      toast.success("Contact feature coming soon!");
    }
  };

  const handleMessage = () => {
    if (!user) {
      toast.error("Please login to send message");
      router.push("/login");
      return;
    }
    toast.success("Messaging feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="mb-8">
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={
                    property.images?.[activeImage]?.url || "/placeholder.jpg"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={handleFavoriteClick}
                    disabled={isLoading}
                    className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current text-red-500" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {property.images && property.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        activeImage === index ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {property.location?.address}, {property.location?.city},{" "}
                  {property.location?.state}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">
                  ${property.price?.toLocaleString()}
                </div>
                <div className="text-gray-600">Property Price</div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                )}
                {property.area && (
                  <div className="text-center">
                    <Square className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">
                      {property.area.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                )}
              </div>

              {/* Contact Owner */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Contact Owner
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-bold text-blue-600">
                        {property.owner?.name?.charAt(0) || "O"}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">
                        {property.owner?.name || "Owner"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Property Owner
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleContact}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Owner
                  </button>

                  <button
                    onClick={handleMessage}
                    className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-medium border border-blue-600 hover:bg-blue-50"
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Property Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-semibold ${
                      property.status === "published"
                        ? "text-green-600"
                        : property.status === "draft"
                          ? "text-yellow-600"
                          : "text-gray-600"
                    }`}
                  >
                    {property.status?.charAt(0).toUpperCase() +
                      property.status?.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-semibold">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">
                    {property.views?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
