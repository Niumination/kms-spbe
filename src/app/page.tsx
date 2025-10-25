// src/app/page.tsx
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16" aria-label="Hero section">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            KMS SPBE
          </h1>
          <p className="text-xl text-gray-800 mb-8 font-medium">
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
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200"
            >
              <div className="text-blue-600 mb-4">
                <BookOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dokumentasi</h3>
              <p className="text-gray-700 font-medium">
                Akses panduan dan dokumentasi SPBE
              </p>
            </Link>

            <Link
              href="/policies"
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200"
            >
              <div className="text-green-600 mb-4">
                <FileText className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kebijakan</h3>
              <p className="text-gray-700 font-medium">
                Kebijakan dan regulasi terkait SPBE
              </p>
            </Link>

            <Link
              href="/auth/login"
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200"
            >
              <div className="text-purple-600 mb-4">
                <LogIn className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Login</h3>
              <p className="text-gray-700 font-medium">
                Masuk untuk akses konten lengkap
              </p>
            </Link>
          </nav>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 shadow-inner" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2 
            id="features-heading" 
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            Fitur Utama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900 text-lg">Pencarian Cerdas</h3>
              <p className="text-gray-700 text-sm font-medium">
                Temukan dokumen dengan cepat dan akurat
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900 text-lg">Akses Terkontrol</h3>
              <p className="text-gray-700 text-sm font-medium">
                Keamanan data dengan kontrol akses berlapis
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900 text-lg">Version Control</h3>
              <p className="text-gray-700 text-sm font-medium">
                Riwayat perubahan dokumen yang lengkap
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2 text-gray-900 text-lg">Kolaborasi Tim</h3>
              <p className="text-gray-700 text-sm font-medium">
                Bekerja bersama dalam satu platform
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}