"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function PropertyCard({ property }) {
  const mainImage = property.images?.[0]?.url || "/placeholder.jpg";

  return (
    <Link href={`/properties/${property._id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {/* Property Image */}
        <div className="relative h-48">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
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
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <span className="text-lg font-bold text-blue-600">
              ${property.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm truncate">
              {property.location?.address}, {property.location?.city}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Property Features */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
            {property.bedrooms && (
              <div>
                <span>{property.bedrooms} beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div>
                <span>{property.bathrooms} baths</span>
              </div>
            )}
            {property.area && (
              <div>
                <span>{property.area} sqft</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
