// src/app/auth/register/page.tsx
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Register | KMS SPBE',
  description: 'Daftar akun KMS SPBE',
};

export default async function RegisterPage() {
  // Check if already logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-blue-600">KMS SPBE</h1>
            </Link>
            <p className="text-gray-600 mt-2">
              Daftar Akun Baru
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}