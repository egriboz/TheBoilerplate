import { Homepage, MetadataProps, HomeProps, Image } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { fetchData, replaceImageUrls } from "@/utils/api";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

const getHomepage = async (): Promise<Homepage[]> => {
  const locale = useLocale();
  const endpoint = `/api/${locale}/homepage/`;
  const posts = await fetchData(endpoint);
  const replacedPosts = posts.map((post: any) => replaceImageUrls(post));
  replacedPosts.forEach((post: { posts: any[]; }) => {
    if (post.posts) {
      post.posts = post.posts.map((innerPost) => replaceImageUrls(innerPost));
    }
  });

  return replacedPosts;

};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const posts = await getHomepage();
  const firstPosts = posts[0];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: firstPosts.title,
    description: firstPosts.pageinfo,
    openGraph: {
      title: firstPosts.title,
      description: firstPosts.pageinfo,
      images: ["/og-image.jpg", ...previousImages],
    },
  };
}

export default async function Posts({ params: { locale } }: HomeProps) {
  const posts = await getHomepage();
  const homepage = posts[0];
  const t = await getTranslator(locale, "Globals");
  return (
    <Container className="p-10 mt-16" id="content">
      <div className="grid grid-cols-3 gap-4 mt-8">
        {homepage.images &&
          homepage.images.map((image: Image) => (
            <img key={image.id} src={image.image} alt={image.alt_text} />
          ))}
      </div>

      <h1>{homepage.title}</h1>

      <div className="my-16 flex gap-4 p-4 bg-slate-300 rounded">
        <Button>{t("button")}</Button>
        <Button variant="secondary">{t("button")}</Button>
        <Button variant="destructive">{t("button")}</Button>
        <Button variant="outline">{t("button")}</Button>
        <Button variant="ghost">{t("button")}</Button>
        <Button variant="link">{t("button")}</Button>
        <Button>
          <Mail className="mr-2 h-4 w-4" /> {t("button")}
        </Button>
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("wait")}
        </Button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: homepage.content }} />

      <hr className="h-0.5 my-10 bg-indigo-900" />
      <h2 className="mt-16">{t("posts")}</h2>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {homepage.posts &&
          homepage.posts.map((post) => (
            <div key={post.id}>
              <Link href={`/post/${post.slug}`} className="flex flex-col gap-3">
                <h5>{post.title}</h5>
                <img src={post.image ? post.image : "/placeholder.jpg"} />
                <div dangerouslySetInnerHTML={{ __html: post.pageinfo }} />
              </Link>
            </div>
          ))}
      </div>
    </Container>
  );
}
