// src/components/dashboard/QuickActions.tsx
'use client';

import Link from 'next/link';
import {
  PlusIcon,
  SearchIcon,
  BookOpenIcon,
  FileTextIcon,
} from 'lucide-react';

const actions = [
  {
    name: 'Cari Dokumen',
    description: 'Temukan dokumen dengan cepat',
    href: '/?focus=search',
    icon: SearchIcon,
    color: 'blue',
  },
  {
    name: 'Buat Konten',
    description: 'Tulis artikel atau dokumen baru',
    href: '/admin/contents/new',
    icon: PlusIcon,
    color: 'green',
    requiresRole: ['editor', 'admin'],
  },
  {
    name: 'Jelajahi Panduan',
    description: 'Lihat panduan penggunaan sistem',
    href: '/docs',
    icon: BookOpenIcon,
    color: 'purple',
  },
  {
    name: 'Template',
    description: 'Download template dokumen',
    href: '/templates',
    icon: FileTextIcon,
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
  green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
  purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
  orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
};

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className={`p-2 rounded-lg ${colorClasses[action.color as keyof typeof colorClasses]}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">
                {action.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}