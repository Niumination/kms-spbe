// src/components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  FileTextIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  TagIcon,
  FolderIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  adminOnly?: boolean;
}

const navigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboardIcon },
  { name: 'Konten', href: '/admin/contents', icon: FileTextIcon },
  { name: 'Kategori', href: '/admin/categories', icon: FolderIcon },
  { name: 'Tags', href: '/admin/tags', icon: TagIcon },
  { name: 'Pengguna', href: '/admin/users', icon: UsersIcon, adminOnly: true },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3Icon },
  { name: 'Pengaturan', href: '/admin/settings', icon: SettingsIcon, adminOnly: true },
];

interface AdminSidebarProps {
  role: string;
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && role !== 'admin') return null;

            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}