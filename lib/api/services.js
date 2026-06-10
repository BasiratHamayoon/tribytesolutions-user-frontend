const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const servicesApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API}/api/services?${query}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${API}/api/services/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch service");
    return res.json();
  },
};