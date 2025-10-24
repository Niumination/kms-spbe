// src/components/search/SearchBar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchResult {
  slug: string
  title: string
  description: string
  type: string
  score: number
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      performSearch()
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const performSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data.results || [])
        setIsOpen(true)
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (slug: string) => {
    router.push(`/docs/${slug}`)
    setQuery('')
    setIsOpen(false)
    setResults([])
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && results.length > 0 && setIsOpen(true)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Cari dokumen, kebijakan, panduan..."
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="max-h-96 overflow-y-auto py-2">
            {results.map((result) => (
              <button
                key={result.slug}
                onClick={() => handleResultClick(result.slug)}
                className="flex w-full items-start px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {result.title}
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                      {result.type}
                    </span>
                  </div>
                  {result.description && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Mencari...</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && !loading && query.length > 2 && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
          <p className="text-sm text-gray-600">
            Tidak ada hasil untuk &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
