import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TableSearchProps<T> {
  data: T[];
  filterKeys: (keyof T)[];
  onFilteredData: (filtered: T[]) => void;
  initialQuery?: string;
}

const TableSearch = <T extends Record<string, any>>({
  data,
  filterKeys,
  onFilteredData,
  initialQuery = ""
}: TableSearchProps<T>) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = data.filter(item =>
        filterKeys.some(key => {
          const value = item[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerQuery);
          }
          return false;
        })
      );

      onFilteredData(filtered);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, data, filterKeys, onFilteredData]);

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Search size={14} />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
