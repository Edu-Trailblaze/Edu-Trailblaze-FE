import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    pageIndex: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ pageIndex, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="p-4 flex items-center justify-between text-gray-500">
            <button
                disabled={pageIndex === 1}
                onClick={() => onPageChange(pageIndex - 1)}
                className="py-2 px-4 rounded-md bg-gray-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex items-center gap-2 text-sm">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${pageIndex === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                disabled={pageIndex === totalPages}
                onClick={() => onPageChange(pageIndex + 1)}
                className="py-2 px-4 rounded-md bg-gray-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next <ChevronRight size={16} />
            </button>
        </div>
    );
}
