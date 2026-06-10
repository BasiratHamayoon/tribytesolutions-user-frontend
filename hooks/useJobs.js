"use client";

import { useData } from "@/context/DataContext";

export function useJobs() {
  const {
    jobs, jobsLoading, jobsError, jobsMeta,
    fetchJobs, getJobBySlug, activeJobs, featuredJobs,
    jobsByDepartment, jobDepartments, jobTypes,
  } = useData();

  return {
    jobs,
    loading: jobsLoading,
    error: jobsError,
    meta: jobsMeta,
    refetch: fetchJobs,
    getBySlug: getJobBySlug,
    active: activeJobs,
    featured: featuredJobs,
    byDepartment: jobsByDepartment,
    departments: jobDepartments,
    types: jobTypes,
    isEmpty: !jobsLoading && jobs.length === 0,
    count: jobs.length,
    activeCount: activeJobs.length,
  };
}