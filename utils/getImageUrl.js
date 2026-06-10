const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function getImageUrl(image) {
  if (!image) return null;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    if (
      image.includes("localhost:5000") &&
      API !== "http://localhost:5000"
    ) {
      return image.replace("http://localhost:5000", API);
    }
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${API}${image}`;
  }

  if (image.startsWith("uploads/")) {
    return `${API}/${image}`;
  }

  return `${API}/uploads/${image}`;
}