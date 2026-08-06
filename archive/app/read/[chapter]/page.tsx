import { chapters } from "../data";
import ChapterReaderClient from "./ChapterReaderClient";

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  return <ChapterReaderClient slug={chapter} />;
}
