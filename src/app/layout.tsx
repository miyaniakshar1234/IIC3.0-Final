import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProofBridge — Evidence-Based Opportunity Portal',
  description: 'Connecting industry requirements to verifiable student proof. Developed for IIC 3.0 MUJ.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-text-primary antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
