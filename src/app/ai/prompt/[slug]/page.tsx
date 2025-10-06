import { notFound } from 'next/navigation';
import { prompts } from '@/lib/prompts';
import PromptClientPage from './PromptClientPage';
import Link from 'next/link';

export async function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

interface PromptPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { slug } = await params;
  const prompt = prompts.find((p) => p.slug === slug);
  if (!prompt) {
    return notFound();
  }
  const backHref = prompt.type === 'video' ? '/ai/videos' : '/ai/images';
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
        >
          ← Înapoi
        </Link>
        <PromptClientPage promptData={prompt} />
      </div>
    </div>
  );
}