// src/app/api/content/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getContentBySlug } from '@/lib/markdown/parser'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: metadata, error } = await supabase
      .from('content_metadata')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error || !metadata) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    // Simplified access check
    if (metadata.access_level !== 'public') {
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      
      // Additional checks for restricted content
      if (metadata.access_level === 'restricted') {
        // Add your authorization logic here
      }
    }
    
    // For now, return metadata only (karena markdown parser belum setup)
    return NextResponse.json({
      success: true,
      data: metadata
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
