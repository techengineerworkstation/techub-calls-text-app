import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'TelnyxPhone - Calls & Messages',
  description: 'Full PBX system with voice calls and messaging',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream-100">
        {children}
      </body>
    </html>
  );
}
