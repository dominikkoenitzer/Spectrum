import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
          <FileQuestion className="w-8 h-8 text-violet-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
