import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Guide } from "@/components/guide";
import { guides } from "@/lib/docs";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(guides)
    .filter((slug) => slug !== "getting-started")
    .map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  return {
    title: guide?.title,
    description: guide?.description,
    alternates: { canonical: `/docs/${slug}/` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!guides[slug]) notFound();
  return <Guide slug={slug} />;
}
