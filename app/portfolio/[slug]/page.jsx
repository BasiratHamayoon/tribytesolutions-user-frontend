import PortfolioDetail from "@/components/sections/portfolio/PortfolioDetail";
import { notFound } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function getProject(slug) {
  try {
    const decoded = decodeURIComponent(slug);

    const res = await fetch(`${API}/api/projects/${encodeURIComponent(decoded)}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data._id) return data;
    }

    const allRes = await fetch(`${API}/api/projects?limit=200`, {
      cache: "no-store",
    });

    if (!allRes.ok) return null;

    const all = await allRes.json();
    const projects = all.data || [];

    const normalize = (str) =>
      (str || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const normalizedSlug = normalize(decoded);

    return (
      projects.find(
        (p) =>
          normalize(p.slug) === normalizedSlug ||
          normalize(p.title) === normalizedSlug ||
          String(p._id) === decoded
      ) || null
    );
  } catch (err) {
    console.error("getProject error:", err);
    return null;
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return { title: "Project Not Found - TriByte Solutions" };
  }
  return {
    title: `${project.title} - TriByte Solutions`,
    description: project.description,
    openGraph: {
      title: `${project.title} - TriByte Solutions`,
      description: project.description,
    },
  };
}

export default async function PortfolioItemPage({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const project = await getProject(slug);

  if (!project || !project._id) notFound();

  return <PortfolioDetail project={project} />;
}