"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {
  Home,
  Users,
  BarChart3,
  DollarSign,
  Eye,
  Building,
  UserCheck,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { api } from "@/app/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/metrics");
      setMetrics(response.data.data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Failed to load system metrics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            System overview and analytics for administrators.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Properties"
            value={metrics.counts.properties}
            icon={Home}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Total Users"
            value={metrics.counts.users}
            icon={Users}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="Property Owners"
            value={metrics.counts.owners}
            icon={Building}
            color="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Total Views"
            value={metrics.statistics.totalViews}
            icon={Eye}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            title="Published Properties"
            value={metrics.counts.published}
            icon={UserCheck}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="Draft Properties"
            value={metrics.counts.draft}
            icon={Calendar}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            title="Archived Properties"
            value={metrics.counts.archived}
            icon={Building}
            color="bg-red-100 text-red-600"
          />
          <StatCard
            title="Avg Property Price"
            value={`$${metrics.statistics.avgPrice.toLocaleString()}`}
            icon={DollarSign}
            color="bg-indigo-100 text-indigo-600"
          />
        </div>

        {/* Recent Properties */}
        <div className="md:col-span-2 card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Properties
          </h3>
          <div className="space-y-3">
            {metrics.recent.properties.length > 0 ? (
              metrics.recent.properties.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-gray-600">
                      By {property.owner?.name || "Unknown"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
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
              ))
            ) : (
              <p className="text-gray-600">No recent properties</p>
            )}
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          User Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {metrics.counts.owners}
            </div>
            <div className="text-gray-600">Property Owners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {metrics.counts.regularUsers}
            </div>
            <div className="text-gray-600">Regular Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {metrics.counts.admins}
            </div>
            <div className="text-gray-600">Administrators</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
