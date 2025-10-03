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

export default function PromptPage({ params }: PromptPageProps) {
  const prompt = prompts.find((p) => p.slug === params.slug);
  if (!prompt) return notFound();
  return <PromptClientPage promptData={prompt} />;
}