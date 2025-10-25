// src/app/admin/categories/page.tsx
import { createClient } from '@/lib/supabase/server';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { FolderIcon } from 'lucide-react';

export const metadata = {
  title: 'Kelola Kategori | Admin KMS SPBE',
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FolderIcon className="w-8 h-8 text-purple-600" />
            Kelola Kategori
          </h1>
          <p className="text-gray-600 mt-1">
            Manage kategori untuk organisasi konten
          </p>
        </div>
      </div>

      <CategoryManager initialCategories={categories || []} />
    </div>
  );
}