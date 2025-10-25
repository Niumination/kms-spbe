// src/types/database.ts
export type UserRole = 'admin' | 'editor' | 'user';
export type AccessLevel = 'public' | 'internal' | 'restricted';
export type ContentType = 'guide' | 'policy' | 'sop' | 'template';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentMetadata {
  title: string;
  description?: string;
  author?: string;
  tags?: string[];
  category?: string;
  access_level: AccessLevel;
  content_type?: ContentType;
  created_at?: string;
  updated_at?: string;
}

export interface Content {
  slug: string;
  title: string;
  description?: string;
  content_type: ContentType;
  body: string;
  metadata: ContentMetadata;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

// ✅ Add ContentWithScore type
export interface ContentWithScore extends Content {
  score: number;
}


export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  type: ContentType;
  score?: number;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>;
      };
      contents: {
        Row: Content;
        Insert: Omit<Content, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Content, 'created_at' | 'updated_at'>>;
      };
    };
  };
}