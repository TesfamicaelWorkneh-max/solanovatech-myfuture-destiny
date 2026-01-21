import { jwtDecode } from "jwt-decode";

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    removeAuthToken();
    return false;
  }

  return true;
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};
