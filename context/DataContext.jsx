"use client";

import {
  createContext, useContext, useState,
  useEffect, useCallback, useRef,
} from "react";
import { servicesApi } from "@/lib/api/services";
import { projectsApi } from "@/lib/api/projects";
import { jobsApi } from "@/lib/api/jobs";
import { teamApi } from "@/lib/api/team";
import { contactsApi } from "@/lib/api/contacts";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [servicesMeta, setServicesMeta] = useState({ pagination: null, filters: null });

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [projectsMeta, setProjectsMeta] = useState({ pagination: null, filters: null });

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);
  const [jobsMeta, setJobsMeta] = useState({ pagination: null, filters: null });

  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);
  const [teamMeta, setTeamMeta] = useState({ pagination: null, filters: null });

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState(null);
  const [contactsMeta, setContactsMeta] = useState({ pagination: null });
  const [contactCounts, setContactCounts] = useState({});

  const hasFetchedServices = useRef(false);
  const hasFetchedProjects = useRef(false);
  const hasFetchedJobs = useRef(false);
  const hasFetchedTeam = useRef(false);

  const fetchServices = useCallback(async (params = {}) => {
    setServicesLoading(true);
    setServicesError(null);
    try {
      const data = await servicesApi.getAll({
        limit: 100, sortBy: "createdAt", sortOrder: "desc", ...params,
      });
      setServices(data.data || []);
      setServicesMeta({ pagination: data.pagination, filters: data.filters });
      return data;
    } catch (err) {
      setServicesError(err.message);
      return null;
    } finally {
      setServicesLoading(false);
    }
  }, []);

  const fetchProjects = useCallback(async (params = {}) => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const data = await projectsApi.getAll({
        limit: 100, sortBy: "createdAt", sortOrder: "desc", ...params,
      });
      setProjects(data.data || []);
      setProjectsMeta({ pagination: data.pagination, filters: data.filters });
      return data;
    } catch (err) {
      setProjectsError(err.message);
      return null;
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  const fetchJobs = useCallback(async (params = {}) => {
    setJobsLoading(true);
    setJobsError(null);
    try {
      const data = await jobsApi.getAll({
        limit: 100, sortBy: "createdAt", sortOrder: "desc", ...params,
      });
      setJobs(data.data || []);
      setJobsMeta({ pagination: data.pagination, filters: data.filters });
      return data;
    } catch (err) {
      setJobsError(err.message);
      return null;
    } finally {
      setJobsLoading(false);
    }
  }, []);

  const fetchTeam = useCallback(async (params = {}) => {
    setTeamLoading(true);
    setTeamError(null);
    try {
      const data = await teamApi.getAll({
        limit: 100, sortBy: "order", sortOrder: "asc",
        isActive: "true", ...params,
      });
      setTeam(data.data || []);
      setTeamMeta({ pagination: data.pagination, filters: data.filters });
      return data;
    } catch (err) {
      setTeamError(err.message);
      return null;
    } finally {
      setTeamLoading(false);
    }
  }, []);

  const fetchContacts = useCallback(async (params = {}) => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const data = await contactsApi.getAll({
        limit: 100, sortBy: "createdAt", sortOrder: "desc", ...params,
      });
      setContacts(data.data || []);
      setContactsMeta({ pagination: data.pagination });
      setContactCounts(data.counts || {});
      return data;
    } catch (err) {
      setContactsError(err.message);
      return null;
    } finally {
      setContactsLoading(false);
    }
  }, []);

  const submitContact = useCallback(async (formData) => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const data = await contactsApi.create(formData);
      return data;
    } catch (err) {
      setContactsError(err.message);
      throw err;
    } finally {
      setContactsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasFetchedServices.current) return;
    hasFetchedServices.current = true;
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (hasFetchedProjects.current) return;
    hasFetchedProjects.current = true;
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (hasFetchedJobs.current) return;
    hasFetchedJobs.current = true;
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (hasFetchedTeam.current) return;
    hasFetchedTeam.current = true;
    fetchTeam();
  }, [fetchTeam]);

  const getServiceBySlug = useCallback(
    (slug) => services.find((s) => s.slug === slug) || null, [services]
  );
  const getProjectBySlug = useCallback(
    (slug) => projects.find((p) => p.slug === slug) || null, [projects]
  );
  const getJobBySlug = useCallback(
    (slug) => jobs.find((j) => j.slug === slug) || null, [jobs]
  );
  const getTeamMemberBySlug = useCallback(
    (slug) => team.find((m) => m.slug === slug) || null, [team]
  );

  const popularServices = services.filter((s) => s.popular);
  const featuredProjects = projects.filter((p) => p.tag === "Featured");
  const activeJobs = jobs.filter((j) => j.isActive);
  const featuredJobs = jobs.filter((j) => j.isFeatured && j.isActive);
  const featuredMembers = team.filter((m) => m.isFeatured && m.isActive);
  const activeMembers = team.filter((m) => m.isActive);

  const projectsByCategory = projects.reduce((acc, p) => {
    const cat = p.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const jobsByDepartment = jobs.reduce((acc, j) => {
    const dept = j.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(j);
    return acc;
  }, {});

  const teamByDepartment = team.reduce((acc, m) => {
    const dept = m.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(m);
    return acc;
  }, {});

  const projectCategories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  const jobDepartments = [...new Set(jobs.map((j) => j.department).filter(Boolean))];
  const jobTypes = [...new Set(jobs.map((j) => j.type).filter(Boolean))];
  const teamDepartments = [...new Set(team.map((m) => m.department).filter(Boolean))];

  return (
    <DataContext.Provider value={{
      services, servicesLoading, servicesError, servicesMeta,
      fetchServices, getServiceBySlug, popularServices,

      projects, projectsLoading, projectsError, projectsMeta,
      fetchProjects, getProjectBySlug, featuredProjects,
      projectsByCategory, projectCategories,

      jobs, jobsLoading, jobsError, jobsMeta,
      fetchJobs, getJobBySlug, activeJobs, featuredJobs,
      jobsByDepartment, jobDepartments, jobTypes,

      team, teamLoading, teamError, teamMeta,
      fetchTeam, getTeamMemberBySlug, featuredMembers,
      activeMembers, teamByDepartment, teamDepartments,

      contacts, contactsLoading, contactsError, contactsMeta,
      contactCounts, fetchContacts, submitContact,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}