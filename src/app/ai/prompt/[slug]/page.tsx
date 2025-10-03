import { notFound } from 'next/navigation';
import { prompts } from '@/lib/prompts';
import PromptClientPage from './PromptClientPage';

export async function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

interface PromptPageProps {
  params: {
    slug: string;
  };
}

export default async function PromptPage({ params }: Promise<PromptPageProps["params"]>) {
  const { slug } = await params;
  const prompt = prompts.find((p) => p.slug === slug);
  if (!prompt) return notFound();
  return <PromptClientPage promptData={prompt} />;
}