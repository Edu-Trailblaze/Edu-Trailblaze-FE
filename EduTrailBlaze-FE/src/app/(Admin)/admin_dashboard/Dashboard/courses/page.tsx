'use client'
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function CoursesManagement() {

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="flex justify-start items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-black">COURSES MANAGEMENT</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Start Date"
                            value={startDay}
                            onChange={(newValue) => setStartDay(newValue)}
                        />
                        <DatePicker
                            label="End Date"
                            value={endDay}
                            onChange={(newValue) => setEndDay(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <div className="flex items-center justify-between mb-4">
                {/* Search and Filter */}
                <div className="flex items-center gap-4 w-2/5">
                    <TextField
                        variant="outlined"
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        color="primary"
                        aria-label="filter"
                        className="bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        <FilterListIcon />
                    </IconButton>
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">Page 2 of 78</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            &lt;
                        </button>
                        <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">COURSE ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">TITLE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">INSTRUCTOR</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">DURATION</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">LANGUAGE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">PRICE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2].map((_, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">200001</td>
                                <td className="px-6 py-4 text-sm text-gray-700">Project Management</td>
                                <td className="px-6 py-4 text-sm text-gray-700">Anthony</td>
                                <td className="px-6 py-4 text-sm text-gray-700">2 hours</td>
                                <td className="px-6 py-4 text-sm text-gray-700">English</td>
                                <td className="px-6 py-4 text-sm text-gray-700">$100</td>
                                <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer">Open</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}
