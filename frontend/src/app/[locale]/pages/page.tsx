import { Page, MetadataProps } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { fetchData } from "@/utils/api";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";

const getPages = async (): Promise<Page[]> => {
  const locale = useLocale();
  const endpoint = `/api/${locale}/pages/`;
  const pages = await fetchData(endpoint);

  return pages;
};

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslator(locale, "Globals");
  return {
    title: t("pages"),
    openGraph: {
      title: t("pages"),
    },
  };
  
}

export default async function Pages({ params: { locale } }: MetadataProps) {
  const pages = await getPages();
  const t = await getTranslator(locale, "Globals");
  return (
    <Container className="p-10 mt-16" id="content">
      <h1 className="mt-24">{t("pages")}</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`/page/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
