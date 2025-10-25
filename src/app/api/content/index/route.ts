// src/app/api/content/index/route.ts
import { NextResponse } from 'next/server';
import { getAllContent } from '@/lib/markdown/parser';

export async function GET() {
  try {
    const contents = await getAllContent();
    
    // Group by category
    const grouped = contents.reduce((acc, content) => {
      const category = content.content_type;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        slug: content.slug,
        title: content.title,
        description: content.description,
        created_at: content.created_at,
        access_level: content.metadata.access_level,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      total: contents.length,
      categories: grouped,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching content index:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content index' },
      { status: 500 }
    );
  }
}