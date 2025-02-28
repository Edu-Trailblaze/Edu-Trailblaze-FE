import React, { useState, useEffect } from "react";
import { News } from "@/app/(Admin)/admin_dashboard/Dashboard/news/page";
import { Search } from "lucide-react";


interface NewsFilterProps {
    columns: { label: string; accessor: keyof News }[];
    visibleColumns: Record<keyof News, boolean>;
    onApply: (newVisibleColumns: Record<keyof News, boolean>) => void;
    onClose: () => void;
    onClear: () => void;
    onFilterApply: (filters: { fromDate: string; toDate: string; status: string; keyword: string }) => void;
}

const NewsFilter: React.FC<NewsFilterProps> = ({ columns, visibleColumns, onApply, onClose, onClear, onFilterApply }) => {
    const [tempVisibleColumns, setTempVisibleColumns] = useState(visibleColumns);
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        status: "Active",
        keyword: "",
    });

    const handleResetField = (field: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [field]: field === "status" ? "Active" : "" }));
    };


    useEffect(() => {
        setTempVisibleColumns(visibleColumns);
    }, [visibleColumns]);

    return (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-86 border z-50">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <button
                    onClick={() => {
                        setFilters({ fromDate: "", toDate: "", status: "Active", keyword: "" });
                        onClear();
                    }}
                    className="text-sm text-gray-600 px-2 py-1 border rounded-md hover:bg-gray-100"
                >
                    Clear
                </button>
                <h4 className="font-semibold text-gray-700">Filters</h4>
                <button
                    onClick={() => {
                        setTempVisibleColumns(visibleColumns);
                        onFilterApply(filters);
                        onApply(tempVisibleColumns);
                        onClose();
                    }}
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
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <button onClick={() => handleResetField("status")} className="text-sm text-teal-600">
                            Reset
                        </button>
                    </div>
                    <select
                        value={filters.status}
                        onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="border p-2 rounded-md w-full mt-1"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Keyword Search */}
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Keyword search</span>
                        <button onClick={() => handleResetField("keyword")} className="text-sm text-teal-600">
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
