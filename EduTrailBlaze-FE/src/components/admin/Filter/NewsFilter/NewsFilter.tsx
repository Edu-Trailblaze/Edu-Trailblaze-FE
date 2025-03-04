import React, { useState, useEffect } from "react";
import { News } from "@/app/(Admin)/admin_dashboard/Dashboard/news/page";
import { Search } from "lucide-react";


interface NewsFilterProps {
    data: News[]; 
    columns: { label: string; accessor: keyof News }[];
    visibleColumns: Record<keyof News, boolean>;
    onApply: (newVisibleColumns: Record<keyof News, boolean>) => void;
    onClose: () => void;
    onClear: () => void;
    onFilterApply: (filteredData: News[]) => void;
}

const NewsFilter: React.FC<NewsFilterProps> = ({
    columns, visibleColumns, data, onApply, onClose, onClear, onFilterApply 
     }) => {
    const [tempVisibleColumns, setTempVisibleColumns] = useState(visibleColumns);
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        keyword: "",
    });

    useEffect(() => {
        setTempVisibleColumns(visibleColumns);
    }, [visibleColumns]);

    const applyFilters = () => {
        console.log("Filters before applying:", filters); // Check dữ liệu bộ lọc
        let filteredData = [...data];
    
        // Lọc theo khoảng ngày với định dạng chuẩn YYYY-MM-DD
        if (filters.fromDate) {
            filteredData = filteredData.filter(news => {
                const createdAtDate = new Date(news.createdAt).toISOString().slice(0, 10); // Giữ đúng định dạng YYYY-MM-DD
                return createdAtDate >= filters.fromDate;
            });
        }
        if (filters.toDate) {
            filteredData = filteredData.filter(news => {
                const createdAtDate = new Date(news.createdAt).toISOString().slice(0, 10);
                return createdAtDate <= filters.toDate;
            });
        }
        
        
        // Lọc theo từ khóa (title hoặc content)
        if (filters.keyword) {
            const keywordLower = filters.keyword.toLowerCase();
            filteredData = filteredData.filter(news =>
                news.title.toLowerCase().includes(keywordLower) || 
                news.content.toLowerCase().includes(keywordLower)
            );
        }
    
        console.log("Filtered news after applying filters:", filteredData); // Check kết quả lọc
        onFilterApply(filteredData);
        onClose();
    };
    

    return (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-86 border z-50">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <button
                   onClick={() => {
                    setFilters({ fromDate: "", toDate: "", keyword: "" });
                    onClear();
                }}
                    className="text-sm text-gray-600 px-2 py-1 border rounded-md hover:bg-gray-100"
                >
                    Clear
                </button>
                <h4 className="font-semibold text-gray-700">Filters</h4>
                <button
                    onClick={applyFilters}
                    className="text-sm bg-black text-white px-3 py-1 rounded-md"
                >
                    Done
                </button>
            </div>

            {/* Filter List */}
            <div className="space-y-2">
                {/* Date Range */}
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Date range</span>
                        <button onClick={() => setFilters(prev => ({ ...prev, fromDate: "", toDate: "" }))} className="text-sm text-teal-600">
                            Reset
                        </button>
                    </div>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="date"
                            value={filters.fromDate}
                            onChange={e => setFilters(prev => ({ ...prev, fromDate: e.target.value }))} 
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="date"
                            value={filters.toDate}
                            onChange={e => setFilters(prev => ({ ...prev, toDate: e.target.value }))} 
                            className="border p-2 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Status */}
            

                {/* Keyword Search */}
                <div className="mb-4">
                <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Keyword search</span>
                        <button onClick={() => setFilters(prev => ({ ...prev, keyword: "" }))} className="text-sm text-teal-600">
                            Reset
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filters.keyword}
                            onChange={e => setFilters(prev => ({ ...prev, keyword: e.target.value }))} 
                            className="border p-2 rounded-md w-full pl-8"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewsFilter;
