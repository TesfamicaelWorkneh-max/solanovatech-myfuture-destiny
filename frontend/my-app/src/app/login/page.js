"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuthStore from "@/app/store/useAuthStore";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;

      login(token, user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user.role === "owner") {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard/user");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <LogIn className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary-600 hover:text-primary-800"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
