"use client";

import PropertyForm from "@/app/components/PropertyForm";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Home } from "lucide-react";

export default function CreatePropertyPage() {
  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Home className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              List New Property
            </h1>
          </div>
          <p className="text-gray-600">
            Fill in the details below to list your property
          </p>
        </div>

        <PropertyForm />
      </div>
    </ProtectedRoute>
  );
}
