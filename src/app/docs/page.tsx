// src/app/docs/page.tsx
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, FileText, Download } from 'lucide-react';

export const metadata = {
  title: 'Dokumentasi | KMS SPBE',
  description: 'Akses panduan dan dokumentasi SPBE',
};

export default async function DocsPage() {
  const supabase = await createClient();

  const { data: docs } = await supabase
    .from('contents')
    .select('*')
    .eq('content_type', 'documentation')
    .eq('status', 'published')
    .eq('access_level', 'public')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dokumentasi SPBE</h1>
            <p className="text-lg text-gray-600">
              Panduan lengkap implementasi Sistem Pemerintahan Berbasis Elektronik
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Panduan Umum</h3>
              <p className="text-sm text-gray-600">Panduan dasar penggunaan sistem</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FileText className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Standar Operasional</h3>
              <p className="text-sm text-gray-600">SOP dan prosedur teknis</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Download className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Template</h3>
              <p className="text-sm text-gray-600">Template dan formulir</p>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {docs && docs.length > 0 ? (
              docs.map((doc: any) => (
                <Link
                  key={doc.id}
                  href={`/docs/${doc.slug}`}
                  className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 mb-3">{doc.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{new Date(doc.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Dokumentasi</h3>
                <p className="text-gray-600">Dokumentasi akan segera ditambahkan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}