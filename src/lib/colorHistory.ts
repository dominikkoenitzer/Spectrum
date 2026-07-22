import type { ColorFormats } from './colorUtils';

const STORAGE_KEY = 'spectrum-color-history';

export const MAX_COLOR_HISTORY = 24;

type Listener = () => void;

const listeners = new Set<Listener>();
const EMPTY: ColorFormats[] = [];
let snapshot: ColorFormats[] | null = null;

function read(): ColorFormats[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as ColorFormats[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: ColorFormats[]) {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — history simply won't persist this session.
  }
  listeners.forEach((listener) => listener());
}

/**
 * localStorage-backed picked-color history, exposed as an external store so
 * components read it via useSyncExternalStore (hydration-safe: the server
 * snapshot is always empty, the client snapshot lazy-loads from storage).
 */
export const colorHistoryStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot(): ColorFormats[] {
    if (snapshot === null) snapshot = read();
    return snapshot;
  },
  getServerSnapshot(): ColorFormats[] {
    return EMPTY;
  },
  add(color: ColorFormats) {
    const prev = colorHistoryStore.getSnapshot();
    if (prev.some((c) => c.hex === color.hex)) return;
    write([color, ...prev].slice(0, MAX_COLOR_HISTORY));
  },
  remove(hex: string) {
    write(colorHistoryStore.getSnapshot().filter((c) => c.hex !== hex));
  },
  clear() {
    snapshot = EMPTY;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    listeners.forEach((listener) => listener());
  },
};
