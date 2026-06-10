import TeamMemberDetail from "@/components/sections/team/TeamMemberDetail";

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  return <TeamMemberDetail slug={slug} />;
}