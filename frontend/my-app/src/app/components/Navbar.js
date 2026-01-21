"use client";

import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Shield,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    {
      href: "/properties",
      label: "Property",
      icon: <Home className="w-4 h-4" />,
    },
  ];

  const userLinks = {
    user: [
      {
        href: "/dashboard/user",
        label: "Dashboard",
        icon: <User className="w-4 h-4" />,
      },
      {
        href: "/dashboard/favorites",
        label: "Favorites",
        icon: <User className="w-4 h-4" />,
      },
    ],
    owner: [
      {
        href: "/dashboard/owner",
        label: "Dashboard",
        icon: <User className="w-4 h-4" />,
      },
      {
        href: "/properties/create",
        label: "Add Property",
        icon: <Home className="w-4 h-4" />,
      },
      {
        href: "/dashboard/my-properties",
        label: "My Properties",
        icon: <User className="w-4 h-4" />,
      },
    ],
    admin: [
      {
        href: "/dashboard/admin",
        label: "Admin Dashboard",
        icon: <Shield className="w-4 h-4" />,
      },
      {
        href: "/dashboard/admin/users",
        label: "Users",
        icon: <User className="w-4 h-4" />,
      },
      {
        href: "/dashboard/admin/properties",
        label: "Properties",
        icon: <Home className="w-4 h-4" />,
      },
    ],
  };

  const getUserLinks = () => {
    if (!user) return [];
    return userLinks[user.role] || [];
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">PropertyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {getUserLinks().map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Hi, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="btn-primary flex items-center space-x-1"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  {getUserLinks().map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
