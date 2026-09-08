'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-border bg-surface/50 flex items-center justify-center opacity-50 ${className}`}
      />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface-raised hover:border-border-accent text-text-secondary hover:text-accent transition-all duration-200 cursor-pointer shadow-sm group ${className}`}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-warning group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-accent group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
