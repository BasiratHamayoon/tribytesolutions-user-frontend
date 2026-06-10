"use client";

import { useData } from "@/context/DataContext";

export function useTeam() {
  const {
    team = [],
    teamLoading,
    teamError,
    teamMeta,
    fetchTeam,
    getTeamMemberBySlug,
    featuredMembers = [],
    activeMembers = [],
    teamByDepartment = {},
    teamDepartments = [],
  } = useData() || {};

  return {
    team,
    loading: teamLoading ?? true,
    error: teamError ?? null,
    meta: teamMeta ?? { pagination: null, filters: null },
    refetch: fetchTeam,
    getBySlug: getTeamMemberBySlug,
    featured: featuredMembers,
    active: activeMembers,
    byDepartment: teamByDepartment,
    departments: teamDepartments,
    isEmpty: !teamLoading && team.length === 0,
    count: team.length,
    activeCount: activeMembers.length,
  };
}