import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { 
  BookOpen, 
  FileText, 
  LogIn, 
  Search, 
  Lock, 
  GitBranch, 
  Users 
} from "lucide-react";

export default function HomePage() {
  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KMS SPBE',
    description: 'Sistem Manajemen Pengetahuan Pemerintah Digital',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'GovernmentOrganization',
      name: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi',
      url: 'https://menpan.go.id',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'KMS SPBE',
    description: 'Platform Manajemen Pengetahuan Pemerintah Digital',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@kms-spbe.go.id',
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16" aria-label="Hero section">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              KMS SPBE
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sistem Manajemen Pengetahuan Pemerintah Digital
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar />
            </div>

            {/* Quick Access Cards */}
            <nav 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              aria-label="Quick access navigation"
            >
              <Link
                href="/docs"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Akses dokumentasi SPBE"
              >
                <div className="text-blue-600 mb-4" aria-hidden="true">
                  <BookOpen className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Dokumentasi</h3>
                <p className="text-gray-600">
                  Akses panduan dan dokumentasi SPBE
                </p>
              </Link>

              <Link
                href="/policies"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Lihat kebijakan dan regulasi SPBE"
              >
                <div className="text-green-600 mb-4" aria-hidden="true">
                  <FileText className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Kebijakan</h3>
                <p className="text-gray-600">
                  Kebijakan dan regulasi terkait SPBE
                </p>
              </Link>

              <Link
                href="/auth/login"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Login untuk akses konten lengkap"
              >
                <div className="text-purple-600 mb-4" aria-hidden="true">
                  <LogIn className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Login</h3>
                <p className="text-gray-600">
                  Masuk untuk akses konten lengkap
                </p>
              </Link>
            </nav>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <h2 
              id="features-heading" 
              className="text-3xl font-bold text-center mb-12"
            >
              Fitur Utama
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Search className="w-8 h-8" />}
                title="Pencarian Cerdas"
                description="Temukan dokumen dengan cepat dan akurat"
                color="blue"
              />
              
              <FeatureCard
                icon={<Lock className="w-8 h-8" />}
                title="Akses Terkontrol"
                description="Keamanan data dengan kontrol akses berlapis"
                color="green"
              />
              
              <FeatureCard
                icon={<GitBranch className="w-8 h-8" />}
                title="Version Control"
                description="Riwayat perubahan dokumen yang lengkap"
                color="purple"
              />
              
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title="Kolaborasi Tim"
                description="Bekerja bersama dalam satu platform"
                color="orange"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}