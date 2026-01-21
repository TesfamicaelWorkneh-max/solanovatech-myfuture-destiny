import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  updateUser: (user) => set({ user }),

  addFavorite: (propertyId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            favorites: [...state.user.favorites, propertyId],
          }
        : null,
    })),

  removeFavorite: (propertyId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            favorites: state.user.favorites.filter((id) => id !== propertyId),
          }
        : null,
    })),
}));

export default useAuthStore;
