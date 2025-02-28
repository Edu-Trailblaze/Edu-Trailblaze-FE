
'use client';

import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

type SortByIdButtonProps<T extends { id?: number }> = {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
};

export default function SortByIdButton<T extends { id?: number }>({
    data,
    setData,
}: SortByIdButtonProps<T>) {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortById = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const sortedData = [...data].sort((a, b) => {
            if (a.id === undefined || b.id === undefined) return 0;
            return newSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });
        setData(sortedData);
    };

    return (
        <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDCB58]"
            onClick={handleSortById}
        >
            <ArrowUpDown size={18} />
        </button>
    );
}
