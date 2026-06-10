const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const projectsApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API}/api/projects?${query}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${API}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  },
};