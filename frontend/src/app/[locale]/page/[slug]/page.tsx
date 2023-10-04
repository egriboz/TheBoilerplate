import { Page, Image, MetadataProps } from "@/utils/types";
import Container from "@/components/Container";
import { fetchData, replaceImageUrls } from "@/utils/api";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const page = await getPage(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page.title,
    description: page.pageinfo,
    openGraph: {
      title: page.title,
      description: page.pageinfo,
      images: page.image ? [page.image, ...previousImages] : [],
    },
  };
}

const getPage = async (slug: string): Promise<Page> => {
  const locale = useLocale();
  const endpoint = `/api/${locale}/page/${slug}`;
  const page = await fetchData(endpoint);
  return replaceImageUrls(page);
};

export default async function Page({
  params: { locale, slug },
}: {
  params: {
    locale: string;
    slug: string;
  };
}) {
  const page = await getPage(slug);
  const t = await getTranslator(locale, "Globals");

  return (
    <Container className="py-10" id="content">
      {page.image && (
        <FadeIn>
          <div className="my-10">
            <img src={page.image} alt={page.title} />
          </div>
        </FadeIn>
      )}
      <FadeIn>
        <h1>{page.title}</h1>
      </FadeIn>
      <FadeIn>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </FadeIn>
      <FadeInStagger faster>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {page.images &&
            page.images.map((img: Image) => (
              <picture key={img.id}>
                <FadeIn>
                  <img src={img.image} alt={img.alt_text} />
                </FadeIn>
              </picture>
            ))}
        </div>
      </FadeInStagger>
      <p className="mt-12 text-xs">page.pageinfo: {page.pageinfo}</p>
    </Container>
  );
}
