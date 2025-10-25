// src/app/admin/contents/new/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ContentEditor } from '@/components/admin/ContentEditor';

export const metadata = {
  title: 'Buat Konten Baru | Admin KMS SPBE',
};

export default async function NewContentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get categories and tags
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('tags').select('*').order('name'),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Buat Konten Baru</h1>
        <p className="text-gray-600 mt-1">
          Buat artikel, panduan, atau dokumen baru
        </p>
      </div>

      {/* Editor */}
      <ContentEditor
        mode="create"
        categories={categories || []}
        tags={tags || []}
      />
    </div>
  );
}