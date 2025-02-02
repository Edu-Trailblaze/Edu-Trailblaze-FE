import React, { useState } from "react";

interface Filters {
    instructor: string;
    language: string;
    minPrice: string;
    maxPrice: string;
}

const FilterButton: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({
        instructor: "",
        language: "",
        minPrice: "",
        maxPrice: "",
    });
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const applyFilters = () => {
        console.log("Filters Applied:", filters);
        setIsFilterOpen(false);
        // API call or filtering logic here
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

            {/* Filter Modal/Dropdown */}
            {isFilterOpen && (
                <div className="absolute right-0 bg-white shadow-md p-4 rounded w-72 mt-2">
                    <h3 className="font-bold mb-2">Filters</h3>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Instructor</label>
                        <input
                            type="text"
                            name="instructor"
                            value={filters.instructor}
                            onChange={handleFilterChange}
                            className="border p-2 rounded w-full"
                            placeholder="Enter instructor name"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={filters.language}
                            onChange={handleFilterChange}
                            className="border p-2 rounded w-full"
                            placeholder="Enter language"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Price Range</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="border p-2 rounded w-full"
                                placeholder="Min"
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="border p-2 rounded w-full"
                                placeholder="Max"
                            />
                        </div>
                    </div>
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
