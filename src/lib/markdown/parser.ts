// src/lib/markdown/parser.ts
import fs from 'fs/promises' // Use promises version
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { rehype } from 'rehype'
import highlight from 'rehype-highlight'

export interface ContentMetadata {
  title: string
  slug: string
  description?: string
  type: 'policy' | 'sop' | 'guide' | 'template'
  status: 'draft' | 'published' | 'archived'
  access_level: 'public' | 'internal' | 'restricted'
  version: string
  author: string
  tags: string[]
  category: string
  created_at: string
  updated_at: string
}

export interface Content {
  metadata: ContentMetadata
  content: string
  htmlContent?: string
}

const contentDirectory = path.join(process.cwd(), 'content')

export async function getContentBySlug(
  type: string,
  slug: string
): Promise<Content | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    
    // Add syntax highlighting
    const highlightedContent = await rehype()
      .use(highlight)
      .process(processedContent.toString())
    
    return {
      metadata: data as ContentMetadata,
      content: content,
      htmlContent: highlightedContent.toString()
    }
  } catch (error) {
    console.error(`Error reading content: ${type}/${slug}`, error)
    return null
  }
}

export async function getAllContent(type?: string): Promise<Content[]> {
  const types = type ? [type] : ['policies', 'sops', 'guides', 'templates']
  const contents: Content[] = []
  
  for (const contentType of types) {
    const directory = path.join(contentDirectory, contentType)
    
    try {
      await fs.access(directory)
      const files = await fs.readdir(directory)
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const slug = file.replace(/\.md$/, '')
          const content = await getContentBySlug(contentType, slug)
          if (content) {
            contents.push(content)
          }
        }
      }
    } catch (error) {
      console.log(`Directory ${directory} not found, skipping...`)
    }
  }
  
  return contents
}

export async function searchContent(query: string): Promise<Content[]> {
  const allContent = await getAllContent()
  const lowercaseQuery = query.toLowerCase()
  
  return allContent.filter(item => {
    const searchableText = `
      ${item.metadata.title} 
      ${item.metadata.description} 
      ${item.metadata.tags.join(' ')}
      ${item.content}
    `.toLowerCase()
    
    return searchableText.includes(lowercaseQuery)
  })
}
