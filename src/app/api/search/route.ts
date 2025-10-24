// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }
    
    const supabase = await createClient()
    
    // Search in database
    const { data: results, error } = await supabase
      .from('content_metadata')
      .select('slug, title, description, content_type')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10)
    
    if (error) {
      console.error('Search error:', error)
      return NextResponse.json({ results: [] })
    }
    
    // Format results
    const formattedResults = results.map(item => ({
      slug: item.slug,
      title: item.title,
      description: item.description || '',
      type: item.content_type,
      score: 1 // You can implement proper scoring later
    }))
    
    return NextResponse.json({ results: formattedResults })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
