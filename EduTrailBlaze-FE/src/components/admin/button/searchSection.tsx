'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchSectionProps {
    placeholder?: string;
    onSearchChange?: (searchValue: string, searchType: 'id' | 'name') => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ placeholder = 'Type to search...', onSearchChange }) => {
    const [searchType, setSearchType] = useState<'id' | 'name'>('id');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearchChange) {
            onSearchChange(event.target.value, searchType);
        }
    };

    return (
        <div className="flex items-center gap-4 w-full">
            {/* Radio Buttons for Search Type */}
            <div className="flex items-center gap-2">
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="id"
                        checked={searchType === 'id'}
                        onChange={() => setSearchType('id')}
                        className="mr-1"
                    />
                    ID
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="name"
                        checked={searchType === 'name'}
                        onChange={() => setSearchType('name')}
                        className="mr-1"
                    />
                    Name
                </label>
            </div>

            {/* Search Input */}
            <TextField
                variant="outlined"
                placeholder={placeholder}
                fullWidth
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchSection;
