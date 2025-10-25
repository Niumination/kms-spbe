// src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/search/searchEngine";
import type { SearchResult } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Perform search - now returns ContentWithScore[]
    const results = await searchContent(query);

    // Map results to SearchResult type
    const formattedResults: SearchResult[] = results.map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description || '',
      type: item.content_type,
      score: item.score, // ✅ Now score exists on ContentWithScore
    }));

    return NextResponse.json({
      query,
      results: formattedResults,
      total: formattedResults.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}