import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resumix.in | India\'s First AGI-Powered Career OS',
  description: '12 specialized AI agents working 24/7 to help you get hired. Build your resume in 60 seconds, auto-apply to jobs, and get interview-ready.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} bg-[#0A0A0A] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
