'use client';

import { useSyncExternalStore } from 'react';
import { Pipette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EyeDropperResult {
  sRGBHex: string;
}

interface EyeDropperConstructor {
  new (): { open(options?: { signal?: AbortSignal }): Promise<EyeDropperResult> };
}

declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }
}

const subscribe = () => () => {};
const isSupported = () => typeof window !== 'undefined' && 'EyeDropper' in window;
const serverSnapshot = () => false;

/** Whether the native EyeDropper API exists (false during SSR/hydration). */
export function useEyeDropperSupported(): boolean {
  return useSyncExternalStore(subscribe, isSupported, serverSnapshot);
}

/** Open the native eyedropper and resolve the picked hex, or null if dismissed. */
export async function openEyeDropper(): Promise<string | null> {
  if (!isSupported()) return null;
  try {
    const result = await new window.EyeDropper!().open();
    return result.sRGBHex;
  } catch {
    // User pressed Esc — not an error.
    return null;
  }
}

/**
 * Native EyeDropper API button — lets the user sample any pixel on their
 * screen (not just inside the page). Renders nothing where the API is
 * unsupported (Safari/Firefox), so callers can place it unconditionally.
 */
export function EyeDropperButton({
  onPick,
  className = '',
  size = 'md',
}: {
  onPick: (hex: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const supported = useEyeDropperSupported();

  if (!supported) return null;

  const pick = async () => {
    const hex = await openEyeDropper();
    if (hex) onPick(hex);
  };

  const sizeClasses = size === 'sm' ? 'h-8 w-8 rounded-md' : 'h-10 w-10 rounded-lg';

  return (
    <button
      type="button"
      onClick={pick}
      aria-label="Pick a color from your screen"
      title="Pick a color from your screen"
      className={cn(
        'flex shrink-0 items-center justify-center border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink',
        sizeClasses,
        className,
      )}
    >
      <Pipette className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={1.75} />
    </button>
  );
}
