"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/properties?location=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden mb-12">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover amazing properties for rent or sale across the country
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-xl p-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="flex-grow flex items-center">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search by location, city, or address..."
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 ml-2 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
