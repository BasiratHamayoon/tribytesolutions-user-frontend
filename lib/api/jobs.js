const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const jobsApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API}/api/jobs?${query}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${API}/api/jobs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch job");
    return res.json();
  },

  apply: async (jobId, formData) => {
    const res = await fetch(`${API}/api/jobs/${jobId}/apply`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit application");
    return data;
  },
};