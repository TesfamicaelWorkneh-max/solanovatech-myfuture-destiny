import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  loading: false,
  error: null,

  setProperties: (properties) => set({ properties }),
  setFeaturedProperties: (properties) =>
    set({ featuredProperties: properties }),
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addProperty: (property) =>
    set((state) => ({
      properties: [property, ...state.properties],
    })),

  updateProperty: (property) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p._id === property._id ? property : p,
      ),
      featuredProperties: state.featuredProperties.map((p) =>
        p._id === property._id ? property : p,
      ),
    })),

  removeProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p._id !== id),
      featuredProperties: state.featuredProperties.filter((p) => p._id !== id),
    })),
}));
