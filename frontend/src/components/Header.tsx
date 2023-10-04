"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { fetchData } from "@/utils/api";
import { MenuItem } from "@/utils/types";
import Container from "@/components/Container";
import NavBar from "@/components/Navigation";

async function fetchNavigationData(locale: string) {
  try {
    // If menuitems does not have a locale, you can keep the endpoint as is
    const endpoint = "/api/menuitems/";
    
    // Fetch data using the same fetchData function
    const response = await fetchData(endpoint);
    
    // Filter data based on locale if needed
    const filteredData = response.filter((item: any) => item.lang === locale);
    
    return { navigations: filteredData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default function Navigation() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const [navigation, setNavigation] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const navigationData = await fetchNavigationData(locale);
      if (navigationData) {
        setNavigation(navigationData.navigations);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <>
      <Container size="fluid" className="bg-indigo-900">
        <NavBar links={navigation || []} />
      </Container>
    </>
  );
}
