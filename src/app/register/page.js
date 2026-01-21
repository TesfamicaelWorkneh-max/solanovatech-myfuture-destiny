"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/app/lib/api";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    role: z.enum(["user", "owner"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await api.post("/auth/register", registerData);

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <UserPlus className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join our property platform</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your full name"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

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
            <label className="label">Phone Number (Optional)</label>
            <input
              type="tel"
              className="input-field"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
          </div>

          <div>
            <label className="label">Account Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="user"
                  {...register("role")}
                  className="mr-2"
                />
                <span>Regular User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="owner"
                  {...register("role")}
                  className="mr-2"
                />
                <span>Property Owner</span>
              </label>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
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

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-800"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
