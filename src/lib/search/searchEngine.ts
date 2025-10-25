// src/lib/search/searchEngine.ts
import lunr from 'lunr';
import { getAllContent } from '@/lib/markdown/parser';
import type { Content, ContentWithScore } from '@/types/database';

let searchIndex: lunr.Index | null = null;
let indexedContents: Content[] = [];

// Build search index
export async function buildSearchIndex(): Promise<void> {
  try {
    const contents = await getAllContent();
    
    // Store contents for later retrieval
    indexedContents = contents;

    // Build lunr index
    searchIndex = lunr(function () {
      this.ref('slug');
      this.field('title', { boost: 10 });
      this.field('description', { boost: 5 });
      this.field('body');
      this.field('tags');

      contents.forEach((content) => {
        this.add({
          slug: content.slug,
          title: content.title,
          description: content.description || '',
          body: content.body,
          tags: content.metadata?.tags?.join(' ') || '',
        });
      });
    });

    console.log(`Search index built with ${contents.length} documents`);
  } catch (error) {
    console.error('Failed to build search index:', error);
    throw error;
  }
}

// Search content - ✅ Return ContentWithScore[]
export async function searchContent(query: string): Promise<ContentWithScore[]> {
  // Build index if not already built
  if (!searchIndex) {
    await buildSearchIndex();
  }

  if (!searchIndex) {
    throw new Error('Search index not available');
  }

  try {
    // Perform search
    const results = searchIndex.search(query);

    // Map results to content objects with scores
    const searchResults = results
      .map((result) => {
        const content = indexedContents.find((c) => c.slug === result.ref);
        if (content) {
          return {
            ...content,
            score: result.score,
          } as ContentWithScore;
        }
        return null;
      })
      .filter((item): item is ContentWithScore => item !== null)
      .slice(0, 10); // Limit to top 10 results

    return searchResults;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
}

// Clear index (useful for rebuilding)
export function clearSearchIndex(): void {
  searchIndex = null;
  indexedContents = [];
}