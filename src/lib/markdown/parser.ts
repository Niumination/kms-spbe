// src/lib/markdown/parser.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Content, ContentMetadata } from '@/types/database';

const contentDirectory = path.join(process.cwd(), 'content');

// Get all markdown files recursively
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  });

  return files;
}

// Get content by slug
export async function getContentBySlug(slug: string): Promise<{
  slug: string;
  frontmatter: ContentMetadata;
  content: string;
} | null> {
  try {
    // Try different possible paths
    const possiblePaths = [
      path.join(contentDirectory, `${slug}.md`),
      path.join(contentDirectory, 'guides', `${slug}.md`),
      path.join(contentDirectory, 'policies', `${slug}.md`),
      path.join(contentDirectory, 'sops', `${slug}.md`),
    ];

    let fullPath: string | null = null;
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        fullPath = p;
        break;
      }
    }

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    
    const contentHtml = processedContent.toString();

    return {
      slug,
      frontmatter: data as ContentMetadata,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading content for slug: ${slug}`, error);
    return null;
  }
}

// Get all content
export async function getAllContent(): Promise<Content[]> {
  try {
    const markdownFiles = getMarkdownFiles(contentDirectory);
    const contents: Content[] = [];

    for (const filePath of markdownFiles) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Generate slug from file path
      const relativePath = path.relative(contentDirectory, filePath);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

      // Process markdown
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(content);

      const metadata = data as ContentMetadata;

      contents.push({
        slug,
        title: metadata.title || slug,
        description: metadata.description,
        content_type: metadata.content_type || 'guide',
        body: processedContent.toString(),
        metadata,
        created_at: metadata.created_at || new Date().toISOString(),
        updated_at: metadata.updated_at || new Date().toISOString(),
      });
    }

    return contents;
  } catch (error) {
    console.error('Error getting all content:', error);
    return [];
  }
}

// Get content by type
export async function getContentByType(type: string): Promise<Content[]> {
  const allContent = await getAllContent();
  return allContent.filter((content) => content.content_type === type);
}