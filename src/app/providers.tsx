'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute={['class', 'data-theme']}
      defaultTheme="dark"
      enableSystem={false}
      themes={['dark', 'light']}
    >
      <AuthProvider>
        {children}
        <Toaster position="bottom-right" richColors theme="system" />
      </AuthProvider>
    </ThemeProvider>
  );
}
