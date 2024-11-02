import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import '../../globals.css';
import SidebarAdmin from '@/components/common/sidebar-admin';

const promptBody = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--body-font-family',
});

const promptTitle = Prompt({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--title-font-family',
});

export const metadata: Metadata = {
  title: 'MyNovel Dashboard Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${promptBody.variable} ${promptTitle.variable} antialiased`}
      >
        <div>
          <SidebarAdmin>{children}</SidebarAdmin>
        </div>
      </body>
    </html>
  );
}
