import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  
  title: {
    default: 'KMS SPBE - Sistem Manajemen Pengetahuan Pemerintah Digital',
    template: '%s | KMS SPBE'
  },
  
  description: 'Platform manajemen pengetahuan untuk mendukung implementasi SPBE di instansi pemerintah. Fitur pencarian cerdas, akses terkontrol, version control, dan kolaborasi tim dalam satu platform terintegrasi.',
  
  keywords: [
    'SPBE',
    'pemerintah digital',
    'knowledge management',
    'KMS',
    'sistem pemerintahan berbasis elektronik',
    'manajemen pengetahuan',
    'dokumentasi pemerintah',
    'kolaborasi digital',
    'e-government'
  ],
  
  authors: [
    { name: 'Tim KMS SPBE' }
  ],
  
  creator: 'Kementerian PANRB',
  publisher: 'Kementerian PANRB',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'KMS SPBE - Sistem Manajemen Pengetahuan Pemerintah Digital',
    description: 'Platform manajemen pengetahuan untuk mendukung implementasi SPBE di instansi pemerintah dengan fitur pencarian cerdas, akses terkontrol, dan kolaborasi tim',
    siteName: 'KMS SPBE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KMS SPBE - Platform Manajemen Pengetahuan Pemerintah',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'KMS SPBE - Sistem Manajemen Pengetahuan Pemerintah Digital',
    description: 'Platform manajemen pengetahuan untuk mendukung implementasi SPBE di instansi pemerintah',
    images: ['/twitter-image.jpg'],
    creator: '@kms_spbe',
  },
  
  alternates: {
    canonical: '/',
  },
  
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Additional meta tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KMS SPBE" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}