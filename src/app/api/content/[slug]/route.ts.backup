// src/app/api/content/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getContentBySlug } from "@/lib/markdown/parser";
import type { ContentMetadata, UserProfile } from "@/types/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const content = await getContentBySlug(slug);

    if (!content) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    // Type assertion for metadata
    const metadata = content.frontmatter as ContentMetadata;

    // Check access level
    if (metadata.access_level && metadata.access_level !== 'public') {
      const supabase = await createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      // Check if user has required role for restricted content
      if (metadata.access_level === 'restricted') {
        // Add type annotation here
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single<Pick<UserProfile, 'role'>>(); // ✅ Fix: Type annotation

        if (!profile || profile.role !== 'admin') {
          return NextResponse.json(
            { error: "Insufficient permissions" },
            { status: 403 }
          );
        }
      }
    }

    return NextResponse.json({
      slug: content.slug,
      content: content.content,
      metadata,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}