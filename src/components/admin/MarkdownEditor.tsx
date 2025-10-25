// src/components/admin/MarkdownEditor.tsx
'use client';

import { useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  LinkIcon,
  CodeIcon,
  ImageIcon,
  EyeIcon,
  EditIcon,
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering (you can use a library like marked or react-markdown)
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br />');
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertMarkdown('**', '**')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('*', '*')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('`', '`')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Code"
          >
            <CodeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertMarkdown('\n- ')}
            className="p-2 hover:bg-gray-200 rounded"
            title="List"
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('[', '](url)')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('![alt](', ')')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              mode === 'write' ? 'bg-white shadow' : 'hover:bg-gray-200'
            }`}
          >
            <EditIcon className="w-4 h-4" />
            <span className="text-sm">Write</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              mode === 'preview' ? 'bg-white shadow' : 'hover:bg-gray-200'
            }`}
          >
            <EyeIcon className="w-4 h-4" />
            <span className="text-sm">Preview</span>
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[400px]">
        {mode === 'write' ? (
          <textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[400px] p-4 font-mono text-sm focus:outline-none resize-none"
            placeholder="Tulis konten dengan Markdown...

Contoh:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
- List item
[Link](url)
![Image](url)"
          />
        ) : (
          <div
            className="p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>
    </div>
  );
}