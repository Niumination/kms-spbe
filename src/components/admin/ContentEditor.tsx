// src/components/admin/ContentEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface ContentData {
  author_id: string;
  published_at: string | null;
  title: string;
  slug: string;
  description: string;
  body: string;
  content_type: string;
  status: string;
  access_level: string;
  category: string;
  tags: string[];
  featured: boolean;
  [key: string]: any;
}

interface ContentEditorProps {
  mode: 'create' | 'edit';
  content?: any;
  categories: any[];
  tags: any[];
}

export function ContentEditor({ mode, content, categories, tags }: ContentEditorProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: content?.title || '',
    slug: content?.slug || '',
    description: content?.description || '',
    body: content?.body || '',
    content_type: content?.content_type || 'article',
    status: content?.status || 'draft',
    access_level: content?.access_level || 'public',
    category: content?.category || '',
    tags: content?.tags || [],
    featured: content?.featured || false,
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const dataToSave = {
      author_id: user.id,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      body: formData.body,
      content_type: formData.content_type,
      status: formData.status,
      access_level: formData.access_level,
      category: formData.category,
      tags: formData.tags,
      featured: formData.featured,
    };

    if (mode === 'create') {
      const { error } = await (supabase as any)
        .from('contents')
        .insert([dataToSave]);
      if (error) throw error;
      toast.success('Konten berhasil dibuat');
    } else {
      const { error } = await (supabase as any)
        .from('contents')
        .update(dataToSave)
        .eq('id', content?.id);
      if (error) throw error;
      toast.success('Konten berhasil diperbarui');
    }

    router.push('/admin/contents');
    router.refresh();
  } catch (error: any) {
    console.error('Error saving content:', error);
    toast.error(error.message || 'Gagal menyimpan konten');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Judul
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="auto-generated-from-title"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konten
          </label>
          <MDEditor
            value={formData.body}
            onChange={(value) => setFormData({ ...formData, body: value || '' })}
            height={400}
          />
        </div>

        {/* Meta Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label htmlFor="access_level" className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <select
              id="access_level"
              value={formData.access_level}
              onChange={(e) => setFormData({ ...formData, access_level: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="internal">Internal</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
        </div>

        {/* Featured Checkbox */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured Content</span>
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/contents')}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : mode === 'create' ? 'Buat Konten' : 'Update Konten'}
        </button>
      </div>
    </form>
  );
}