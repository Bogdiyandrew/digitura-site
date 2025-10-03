import { notFound } from 'next/navigation';
import { prompts } from '@/lib/prompts';
import PromptClientPage from './PromptClientPage';

export async function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export default function PromptPage({ params }: { params: { slug: string } }) {
  const prompt = prompts.find((p) => p.slug === params.slug);
  if (!prompt) return notFound();
  return <PromptClientPage promptData={prompt} />;
}