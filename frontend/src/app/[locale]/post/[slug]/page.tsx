import { Post, Image, MetadataProps } from "@/utils/types";
import Container from "@/components/Container";
import Link from "next/link";
import { useLocale } from "next-intl";
import { fetchData, replaceImageUrls } from "@/utils/api";
import { formatDate } from "@/utils/date";
import { getTranslator } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPost(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.pageinfo,
    openGraph: {
      title: post.title,
      description: post.pageinfo,
      images: post.image ? [post.image, ...previousImages] : [],
    },
  };
}

const getPost = async (slug: string): Promise<Post> => {
  const locale = useLocale();
  const endpoint = `/api/${locale}/post/${slug}`;
  const post = await fetchData(endpoint);
  return replaceImageUrls(post);
};


export default async function Page({
  params: { locale, slug },
}: {
  params: {
    locale: string;
    slug: string;
  };
}) {
  const post = await getPost(slug);
  const t = await getTranslator(locale, "Globals");

  return (
    <>
      <Container className="p-10 mt-16" id="content">
      {post.image && (
        <div className="my-10">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      <h1 className="mt-12">{post.title}</h1>
      <p className="mb-16 text-sm">
        {t("posted")}: {formatDate(post.date_posted, locale)}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="grid grid-cols-4 gap-4 mt-8">
        {post.images &&
          post.images.map((img: Image) => (
            <picture key={img.id}>
              <img src={img.image} alt={img.alt_text} />
            </picture>
          ))}
      </div>
      {post.categories.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-3 text-base">{t("categories")}:</h3>
          <ul>
            {post.categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${locale}/category/${category.slug}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {post.tags.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-base">{t("tags")}:</h3>
          <ul>
            {post.tags.map((tag) => (
              <li key={tag.slug}>
                <Link href={`/${locale}/tag/${tag.slug}`}>{tag.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
    </>
  );
}
