import React, { useState } from "react";

interface FilterField {
    key: string;
    label: string;
}

interface FilterButtonProps {
    fieldsToFilter: FilterField[]; // Dynamic fields (e.g., price, rating, students)
    onApplyFilters: (filters: Record<string, { min?: number; max?: number }>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ fieldsToFilter, onApplyFilters }) => {
    const [filters, setFilters] = useState<Record<string, { min?: number; max?: number }>>({});
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, type: "min" | "max") => {
        const value = e.target.value ? parseFloat(e.target.value) : undefined;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: { ...prevFilters[field], [type]: value },
        }));
    };

    const applyFilters = () => {
        console.log("Filters Applied:", filters);
        onApplyFilters(filters);
        setIsFilterOpen(false);
    };

    return (
        <div className="relative">
            {/* Filter Button */}
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="border p-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                <i className="fas fa-filter"></i> Filter
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
                <div className="absolute right-0 bg-white shadow-md p-4 rounded w-72 mt-2 z-50">
                    <h3 className="font-bold mb-2">Filters</h3>
                    {fieldsToFilter.map(({ key, label }) => (
                        <div key={key} className="mb-2">
                            <label className="block text-sm font-medium">{label}</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={filters[key]?.min || ""}
                                    onChange={(e) => handleFilterChange(e, key, "min")}
                                    className="border p-2 rounded w-full"
                                    placeholder="Min"
                                />
                                <input
                                    type="number"
                                    value={filters[key]?.max || ""}
                                    onChange={(e) => handleFilterChange(e, key, "max")}
                                    className="border p-2 rounded w-full"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={applyFilters}
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterButton;
