import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Daftar alamat wilayah Indonesia',
   description: 'Daftar alamat wilayah Indonesia',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html
         lang="en"
         translate="no">
         <body className={inter.className.concat(' text-sm antialiased')}>
            {children}
         </body>
      </html>
   );
}
