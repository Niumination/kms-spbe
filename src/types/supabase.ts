// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'editor' | 'viewer'
          department: string | null
          access_groups: string[]
          avatar_url: string | null
          last_login: string | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          department?: string | null
          access_groups?: string[]
          avatar_url?: string | null
          last_login?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          department?: string | null
          access_groups?: string[]
          avatar_url?: string | null
          last_login?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      content_metadata: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          content_type: string
          status: 'draft' | 'published' | 'archived'
          access_level: 'public' | 'internal' | 'restricted'
          version: string
          tags: string[]
          category: string | null
          author_id: string | null
          reviewers: string[]
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          content_type: string
          status?: 'draft' | 'published' | 'archived'
          access_level?: 'public' | 'internal' | 'restricted'
          version?: string
          tags?: string[]
          category?: string | null
          author_id?: string | null
          reviewers?: string[]
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          content_type?: string
          status?: 'draft' | 'published' | 'archived'
          access_level?: 'public' | 'internal' | 'restricted'
          version?: string
          tags?: string[]
          category?: string | null
          author_id?: string | null
          reviewers?: string[]
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_document_access: {
        Args: {
          p_user_id: string
          p_doc_slug: string
        }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_action: string
          p_resource_type?: string
          p_resource_id?: string
          p_metadata?: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
