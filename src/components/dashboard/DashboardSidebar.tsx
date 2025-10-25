// src/components/dashboard/DashboardSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  BookmarkIcon,
  ActivityIcon,
  FileTextIcon,
  UsersIcon,
  SettingsIcon,
  BarChart3Icon,
  HomeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  roles?: string[];
}

const navigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
  { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: BookmarkIcon },
  { name: 'Aktivitas', href: '/dashboard/activity', icon: ActivityIcon },
  { 
    name: 'Konten Saya', 
    href: '/dashboard/my-content', 
    icon: FileTextIcon,
    roles: ['editor', 'admin']
  },
];

const adminNavigation: SidebarItem[] = [
  { 
    name: 'Kelola Konten', 
    href: '/admin/contents', 
    icon: FileTextIcon,
    roles: ['editor', 'admin']
  },
  { 
    name: 'Pengguna', 
    href: '/admin/users', 
    icon: UsersIcon,
    roles: ['admin']
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3Icon,
    roles: ['admin']
  },
  { 
    name: 'Pengaturan', 
    href: '/admin/settings', 
    icon: SettingsIcon,
    roles: ['admin']
  },
];

interface DashboardSidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const canAccess = (item: SidebarItem) => {
    if (!item.roles) return true;
    return item.roles.includes(role);
  };

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-8">
        {/* Main Navigation */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu Utama
          </h3>
          <nav className="mt-3 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <HomeIcon className="w-5 h-5" />
              Kembali ke Home
            </Link>
            {navigation.filter(canAccess).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
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

        {/* Admin Navigation */}
        {(role === 'admin' || role === 'editor') && (
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Admin
            </h3>
            <nav className="mt-3 space-y-1">
              {adminNavigation.filter(canAccess).map((item) => {
                const isActive = pathname === item.href;
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
        )}
      </div>
    </aside>
  );
}