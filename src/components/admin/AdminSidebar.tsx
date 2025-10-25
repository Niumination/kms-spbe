// src/components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react';

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  [key: string]: any;
}

export interface AdminSidebarProps {
  profile: Profile;
}

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/contents',
      label: 'Konten',
      icon: FileText,
    },
    {
      href: '/admin/categories',
      label: 'Kategori',
      icon: FolderOpen,
    },
    {
      href: '/admin/tags',
      label: 'Tags',
      icon: Tags,
    },
    {
      href: '/admin/users',
      label: 'Users',
      icon: Users,
      adminOnly: true,
    },
    {
      href: '/admin/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
      adminOnly: true,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            K
          </div>
          <span className="text-xl font-bold text-gray-900">KMS Admin</span>
        </Link>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          // Hide admin-only items for non-admin users
          if (item.adminOnly && profile.role !== 'admin') {
            return null;
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}