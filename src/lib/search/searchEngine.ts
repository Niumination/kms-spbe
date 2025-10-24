// src/lib/search/searchEngine.ts
import lunr from 'lunr'
import { getAllContent, Content } from '@/lib/markdown/parser'

let searchIndex: lunr.Index | null = null
let documents: Map<string, Content> = new Map()

export function buildSearchIndex() {
  const contents = getAllContent()
  
  documents.clear()
  contents.forEach(content => {
    documents.set(content.metadata.slug, content)
  })

  searchIndex = lunr(function() {
    this.ref('slug')
    this.field('title', { boost: 10 })
    this.field('description', { boost: 5 })
    this.field('content')
    this.field('tags', { boost: 3 })

    contents.forEach(content => {
      this.add({
        slug: content.metadata.slug,
        title: content.metadata.title,
        description: content.metadata.description || '',
        content: content.content,
        tags: content.metadata.tags.join(' ')
      })
    })
  })
}

export function searchDocuments(query: string, userAccessLevel?: string) {
  if (!searchIndex) {
    buildSearchIndex()
  }

  const results = searchIndex!.search(query)
  
  return results
    .map(result => {
      const doc = documents.get(result.ref)
      if (!doc) return null
      
      // Filter by access level
      if (userAccessLevel) {
        if (doc.metadata.access_level === 'restricted' && userAccessLevel !== 'admin') {
          return null
        }
        if (doc.metadata.access_level === 'internal' && userAccessLevel === 'public') {
          return null
        }
      } else if (doc.metadata.access_level !== 'public') {
        return null
      }
      
      return {
        ...doc,
        score: result.score
      }
    })
    .filter(Boolean)
}
