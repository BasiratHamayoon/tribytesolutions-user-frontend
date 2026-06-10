import JobApplyPage from "@/components/sections/careers/JobApplyPage";
import { notFound } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function getJob(slug) {
  try {
    const res = await fetch(`${API}/api/jobs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found - TriByte Solutions" };
  return {
    title: `Apply — ${job.title} - TriByte Solutions`,
    description: job.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ApplyPage({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();
  return <JobApplyPage job={job} />;
}