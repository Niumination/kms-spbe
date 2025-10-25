// src/components/admin/SettingsForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import {
  Globe,
  Mail,
  Bell,
  Shield,
  Database,
  Zap,
} from 'lucide-react';

interface SettingsFormProps {
  initialSettings: any;
}

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'checkbox';
  placeholder?: string;
}

interface SectionConfig {
  title: string;
  icon: any;
  fields: FieldConfig[];
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    site_name: initialSettings?.site_name || 'KMS SPBE',
    site_description: initialSettings?.site_description || '',
    contact_email: initialSettings?.contact_email || '',
    enable_registration: initialSettings?.enable_registration ?? true,
    enable_notifications: initialSettings?.enable_notifications ?? true,
    maintenance_mode: initialSettings?.maintenance_mode ?? false,
    max_upload_size: initialSettings?.max_upload_size || 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await (supabase as any)
        .from('settings')
        .upsert(formData);

      if (error) throw error;
      toast.success('Settings berhasil disimpan');
      router.refresh();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const settingsSections: SectionConfig[] = [
    {
      title: 'General Settings',
      icon: Globe,
      fields: [
        {
          name: 'site_name',
          label: 'Site Name',
          type: 'text',
          placeholder: 'KMS SPBE',
        },
        {
          name: 'site_description',
          label: 'Site Description',
          type: 'textarea',
          placeholder: 'Platform manajemen pengetahuan...',
        },
      ],
    },
    {
      title: 'Contact Settings',
      icon: Mail,
      fields: [
        {
          name: 'contact_email',
          label: 'Contact Email',
          type: 'email',
          placeholder: 'admin@kms-spbe.go.id',
        },
      ],
    },
    {
      title: 'Feature Settings',
      icon: Zap,
      fields: [
        {
          name: 'enable_registration',
          label: 'Enable User Registration',
          type: 'checkbox',
        },
        {
          name: 'enable_notifications',
          label: 'Enable Notifications',
          type: 'checkbox',
        },
        {
          name: 'maintenance_mode',
          label: 'Maintenance Mode',
          type: 'checkbox',
        },
      ],
    },
    {
      title: 'Upload Settings',
      icon: Database,
      fields: [
        {
          name: 'max_upload_size',
          label: 'Max Upload Size (MB)',
          type: 'number',
          placeholder: '10',
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {settingsSections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      rows={3}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.placeholder || ''}
                    />
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        id={field.name}
                        checked={formData[field.name as keyof typeof formData] as boolean}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.checked })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Enable this feature</span>
                    </label>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      value={formData[field.name as keyof typeof formData] as string | number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]:
                            field.type === 'number'
                              ? parseInt(e.target.value) || 0
                              : e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.placeholder || ''}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}