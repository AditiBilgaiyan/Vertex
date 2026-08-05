import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'vertex-theme';

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Light/dark theme with an explicit user override.
 *
 * With nothing stored we follow the OS and keep following it as it changes.
 * The first toggle writes a preference to localStorage, which then wins — the
 * same key the inline script in index.html reads to avoid a flash on load.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() => readStored() ?? systemTheme());
  const [isPinned, setIsPinned] = useState(() => readStored() !== null);

  useEffect(() => {
    if (isPinned) {
      document.documentElement.dataset.theme = theme;
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [theme, isPinned]);

  useEffect(() => {
    if (isPinned) return undefined;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light');

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [isPinned]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — the toggle still works for this session */
      }
      return next;
    });
    setIsPinned(true);
  }, []);

  return { theme, toggleTheme };
}
