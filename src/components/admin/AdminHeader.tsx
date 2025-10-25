// src/components/admin/AdminHeader.tsx
'use client';

import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  [key: string]: any;
}

interface AdminHeaderProps {
  user: User;
  profile: Profile;
}

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-600">
            Selamat datang, {profile.full_name || user.email}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {profile.full_name || user.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {profile.role}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {(profile.full_name || user.email || 'U')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}