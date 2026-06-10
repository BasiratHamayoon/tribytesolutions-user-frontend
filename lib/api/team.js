const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const teamApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API}/api/team?${query}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch team");
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${API}/api/team/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch team member");
    return res.json();
  },
};