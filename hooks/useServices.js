"use client";

import { useData } from "@/context/DataContext";

export function useServices() {
  const {
    services,
    servicesLoading,
    servicesError,
    servicesMeta,
    fetchServices,
    getServiceBySlug,
    popularServices,
    servicesByCategory,
  } = useData();

  return {
    services,
    loading: servicesLoading,
    error: servicesError,
    meta: servicesMeta,
    refetch: fetchServices,
    getBySlug: getServiceBySlug,
    popular: popularServices,
    byCategory: servicesByCategory,
    isEmpty: !servicesLoading && services.length === 0,
    count: services.length,
  };
}