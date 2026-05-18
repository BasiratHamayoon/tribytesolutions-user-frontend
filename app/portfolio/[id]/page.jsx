import PortfolioDetail from "@/components/sections/portfolio/PortfolioDetail";
import { portfolio } from "@/data/portfolio";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return portfolio.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = portfolio.find((p) => String(p.id) === id);
  if (!item) return {};
  return {
    title: `${item.title} - TriByte Solutions`,
    description: item.description,
  };
}

export default async function PortfolioItemPage({ params }) {
  const { id } = await params;
  const item = portfolio.find((p) => String(p.id) === id);
  if (!item) notFound();
  return <PortfolioDetail item={item} />;
}