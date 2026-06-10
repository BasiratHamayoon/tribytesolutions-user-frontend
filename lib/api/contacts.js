const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const contactsApi = {
  create: async (data) => {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to send message");
    return result;
  },

  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    const response = await fetch(`${API_BASE}/contact?${query}`, {
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to fetch contacts");
    return result;
  },

  reply: async (id, replyMessage) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
    const response = await fetch(`${API_BASE}/contact/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify({ replyMessage }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to send reply");
    return result;
  },
};