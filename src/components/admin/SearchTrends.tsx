// src/components/admin/SearchTrends.tsx
import { TrendingUpIcon, SearchIcon } from 'lucide-react';

interface Search {
  query: string;
  count: number;
}

interface SearchTrendsProps {
  searches: Search[];
}

export function SearchTrends({ searches }: SearchTrendsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUpIcon className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Search Trends</h3>
      </div>

      <div className="space-y-3">
        {searches.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Belum ada data pencarian</p>
        ) : (
          searches.map((search, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 truncate">
                  {search.query}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <span className="text-sm font-semibold text-orange-600">
                  {search.count}
                </span>
                <span className="text-xs text-gray-500">searches</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}