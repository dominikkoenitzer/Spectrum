import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileQuestion } from 'lucide-react';

// Next already marks the not-found route noindex, so only the wording is set here.
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-2 border border-line mb-6">
          <FileQuestion className="w-8 h-8 text-ink" />
        </div>
        <h1 className="text-6xl font-bold text-ink mb-2">404</h1>
        <h2 className="text-xl font-semibold text-ink mb-2">Page Not Found</h2>
        <p className="text-ink-2 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-ink hover:bg-ink/90 text-paper">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
