// RootLayout.tsx

import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css'; // Import your global styles

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
};

export default RootLayout;
