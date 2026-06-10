"use client";

import { useData } from "@/context/DataContext";

export function useProjects() {
  const {
    projects,
    projectsLoading,
    projectsError,
    projectsMeta,
    fetchProjects,
    getProjectBySlug,
    featuredProjects,
    projectsByCategory,
    projectCategories,
  } = useData();

  return {
    projects,
    loading: projectsLoading,
    error: projectsError,
    meta: projectsMeta,
    refetch: fetchProjects,
    getBySlug: getProjectBySlug,
    featured: featuredProjects,
    byCategory: projectsByCategory,
    categories: projectCategories,
    isEmpty: !projectsLoading && projects.length === 0,
    count: projects.length,
  };
}