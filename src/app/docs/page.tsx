import type { Metadata } from "next";
import { Guide } from "@/components/guide";
export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install Mammoth and connect to your first local document database.",
  alternates: { canonical: "/docs/" },
};
export default function Page() {
  return <Guide slug="getting-started" />;
}
