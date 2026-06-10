"use client";

import { useData } from "@/context/DataContext";

export function useContact() {
  const {
    contacts = [],
    contactsLoading,
    contactsError,
    contactsMeta,
    submitContact,
    fetchContacts,
    contactCounts = {},
  } = useData() || {};

  return {
    contacts,
    loading: contactsLoading ?? false,
    error: contactsError ?? null,
    meta: contactsMeta ?? { pagination: null },
    counts: contactCounts,
    submit: submitContact,
    refetch: fetchContacts,
    isEmpty: !contactsLoading && contacts.length === 0,
    count: contacts.length,
  };
}