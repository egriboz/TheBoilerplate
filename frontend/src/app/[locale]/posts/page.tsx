import { Post, MetadataProps } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { fetchData } from "@/utils/api";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";

const getPosts = async (): Promise<Post[]> => {
  const locale = useLocale();
  const endpoint = `/api/${locale}/posts/`;
  const posts = await fetchData(endpoint);

  return posts;
};

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslator(locale, "Globals");

  return {
    title: t("posts"),
    openGraph: {
      title: t("posts"),
    },
  };
}

export default async function Posts({ params: { locale } }: MetadataProps) {
  const posts = await getPosts();
  const t = await getTranslator(locale, "Globals");
  return (
    <Container className="p-10 mt-16" id="content">
      <h1>{t("posts")}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
