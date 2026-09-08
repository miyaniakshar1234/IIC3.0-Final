import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProofBridge — Evidence-Based Skill Matching',
  description: 'Connecting industry requirements to authentic evidence of student ability.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
