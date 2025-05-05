import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthGuard from './(workspace)/auth-guard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Big Chat Brasil',
  description: 'Plataforma de envio de SMS e mensagens',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthGuard />
        <main>{children}</main>
      </body>
    </html>
  );
}
