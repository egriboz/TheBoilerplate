import { ReactNode } from "react";

export interface MetadataProps {
  params: {
    slug: string;
    locale: string;
  };
}

export interface Layout {
  children: ReactNode;
  params: {
    locale: string;
    subpageTitle?: string;
    subPageDescription?: string;
  };
}

export interface MenuItem {
  id: number;
  title: string;
  link: string;
  order: number;
  parent: number | null;
  page_slug: string | null;
  newtab: boolean;
  children: Submenu[] | null;
}

export interface Submenu {
  title: string;
  link: string;
  icon?: string;
}

export interface NavbarProps {
  links: MenuItem[];
}

export interface HomeProps {
  params: {
    locale: string;
  };
}

export interface Homepage {
  id: number;
  images?: Image[];
  title: string;
  description: string;
  pageinfo: string;
  content: string;
  lang: string;
  posts?: Post[];
}

export interface Image {
  id: number;
  image: string;
  alt_text: string;
}

export interface Category {
  title: string;
  slug: string;
}

export interface Tag {
  title: string;
  slug: string;
}

export interface Page {
  id: number;
  title: string;
  description: string;
  slug: string;
  langslug?: string;
  pageinfo: string;
  content: string;
  images?: Image[];
  date_pageed?: string;
  lang: string;
  image: string | null;
  menu: boolean;
}

export interface Post {
  id: number;
  categories: Category[];
  tags: Tag[];
  images?: Image[];
  title: string;
  description: string;
  slug: string;
  langslug?: string;
  pageinfo: string;
  content: string;
  image: string | null;
  date_posted: string;
  lang: string;
}
