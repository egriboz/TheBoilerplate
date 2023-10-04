import { Category, Post, MetadataProps } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { fetchData, replaceImageUrls } from "@/utils/api";
import { getTranslator } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const locale = params.locale;

  const categories = await getCategories();
  const matchedCategory = categories.find((category) => category.slug === slug);
  const title = matchedCategory?.title || "Başlık";
  const previousImages = (await parent).openGraph?.images || [];
  const t = await getTranslator(locale, "Globals");
  return {
    title: `${title} | ${t("category")}`,
    description: `${title} | ${t("category")}`,
    openGraph: {
      title: `${title} | ${t("category")}`,
      description: `${title} | ${t("category")}`,
      images: ["/og-image.jpg", ...previousImages],
    },
  };
}

const getCategories = async (): Promise<Category[]> => {
  const endpoint = `/api/categories/`;
  return await fetchData(endpoint);
};

const getCategoryPosts = async (
  slug: string,
  locale: string
): Promise<Post[]> => {
  const endpoint = `/api/${locale}/categories/${slug}/`;
  const posts = await fetchData(endpoint);
  const filteredPosts = posts.filter(
    (post: { lang: string }) => post.lang === locale
  );
  return filteredPosts.map(replaceImageUrls);
};

export default async function Page({
  params: { locale, slug },
}: {
  params: {
    locale: string;
    slug: string;
  };
}) {
  const posts = await getCategoryPosts(slug, locale);
  const categories = await getCategories();
  const matchedCategory = categories.find((category) => category.slug === slug);
  const title = matchedCategory?.title || "Başlık";
  const t = await getTranslator(locale, "Globals");

  return (
    <>
      <Container className="p-10 mt-16" id="content">
      <h1>
        {t("category")}: <span className="text-gray-500">{title}</span>
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/${locale}/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
    </>
  );
}
