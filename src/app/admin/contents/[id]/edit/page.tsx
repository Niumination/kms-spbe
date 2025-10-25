// src/app/admin/contents/[id]/edit/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { ContentEditor } from '@/components/admin/ContentEditor';

export const metadata = {
  title: 'Edit Konten | Admin KMS SPBE',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get content
  const { data: content, error } = await supabase
    .from('contents')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !content) {
    notFound();
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
        <h1 className="text-3xl font-bold text-gray-900">Edit Konten</h1>
        <p className="text-gray-600 mt-1">
          Update konten: {content.title}
        </p>
      </div>

      {/* Editor */}
      <ContentEditor
        mode="edit"
        content={content}
        categories={categories || []}
        tags={tags || []}
      />
    </div>
  );
}