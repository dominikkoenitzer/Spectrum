export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-2 border border-line mb-4">
          <div className="w-8 h-8 border-4 border-line border-t-ink rounded-full animate-spin" />
        </div>
        <p className="text-ink-2 text-sm">Loading colors...</p>
      </div>
    </div>
  );
}
