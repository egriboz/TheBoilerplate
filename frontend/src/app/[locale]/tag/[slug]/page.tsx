import { Tag, Post, Image } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { useLocale } from "next-intl";
import { fetchData, replaceImageUrls } from "@/utils/api";
import { getTranslator } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";

type MetadataProps = {
  params: { slug: string; locale: string };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const locale = params.locale;

  const tags = await getTags();
  const matchedTag = tags.find((tag) => tag.slug === slug);
  const title = matchedTag?.title || "Başlık";
  const previousImages = (await parent).openGraph?.images || [];
  const t = await getTranslator(locale, "Globals");
  return {
    title: `${title} | ${t("tag")}`,
    description: `${title} | ${t("tag")}`,
    openGraph: {
      title: `${title} | ${t("tag")}`,
    description: `${title} | ${t("tag")}`,
      images: ["/og-image.jpg", ...previousImages],
    },
  };
}

const getTags = async (): Promise<Tag[]> => {
  const endpoint = `/api/tags/`;
  return await fetchData(endpoint);
};

const getTagPosts = async (
  slug: string,
  locale: string
): Promise<Post[]> => {
  const endpoint = `/api/${locale}/tags/${slug}/`;
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
  const posts = await getTagPosts(slug, locale);
  const tags = await getTags();
  const matchedTag = tags.find((tag) => tag.slug === slug);
  const title = matchedTag?.title || "Başlık";
  const t = await getTranslator(locale, "Globals");

  return (
    <>
      <Container className="p-10 mt-16" id="content">
      <h1>
        {t("tag")}: <span className="text-gray-500">{title}</span>
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
