// src/app/policies/page.tsx
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Scale, FileText, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Kebijakan | KMS SPBE',
  description: 'Kebijakan dan regulasi terkait SPBE',
};

export default async function PoliciesPage() {
  const supabase = await createClient();

  const { data: policies } = await supabase
    .from('contents')
    .select('*')
    .eq('content_type', 'policy')
    .eq('status', 'published')
    .eq('access_level', 'public')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan SPBE</h1>
            <p className="text-lg text-gray-600">
              Regulasi dan kebijakan terkait implementasi SPBE
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Scale className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Peraturan</h3>
              <p className="text-sm text-gray-600">Undang-undang dan peraturan pemerintah</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FileText className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Pedoman</h3>
              <p className="text-sm text-gray-600">Pedoman dan panduan kebijakan</p>
            </div>
          </div>

          {/* Policies List */}
          <div className="space-y-4">
            {policies && policies.length > 0 ? (
              policies.map((policy: any) => (
                <Link
                  key={policy.id}
                  href={`/policies/${policy.slug}`}
                  className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600 mb-3">{policy.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(policy.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Kebijakan</h3>
                <p className="text-gray-600">Kebijakan akan segera ditambahkan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}