// src/components/admin/PopularSearches.tsx
import { SearchIcon, TrendingUpIcon } from 'lucide-react';

interface Search {
  query: string;
  count?: number;
}

interface PopularSearchesProps {
  searches: Search[];
}

export function PopularSearches({ searches }: PopularSearchesProps) {
  const maxCount = Math.max(...searches.map((s) => s.count || 0), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUpIcon className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Top Searches</h3>
      </div>

      <div className="space-y-3">
        {searches.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Belum ada pencarian</p>
        ) : (
          searches.map((search, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 truncate">
                    {search.query}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600 ml-2">
                  {search.count || 0}
                </span>
              </div>
              <div className="ml-8 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{
                    width: `${((search.count || 0) / maxCount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}