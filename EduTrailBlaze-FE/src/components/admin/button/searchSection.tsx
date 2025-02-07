'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchSectionProps {
    placeholder?: string;
    onSearchChange?: (searchValue: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ placeholder = 'Type to search...', onSearchChange }) => {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearchChange) {
            onSearchChange(event.target.value);
        }
    };

    return (
        <div className="flex items-center gap-4 w-full">

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
