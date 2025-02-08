import React from "react";

export default function VouchersManagement() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-black">VOUCHERS MANAGEMENT</h1>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
                    <span className="text-gray-700 text-sm">10/1/2025 - 20/1/2025</span>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Type to search..."
                    className="border rounded-md px-4 py-2 w-full shadow-sm focus:outline-none focus:ring focus:ring-gray-300"
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    <span className="font-medium">Filter</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">VOUCHER CODE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">DESCRIPTION</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">DISCOUNT</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">EXPIRY DATE</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">STATUS</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((_, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">VOUCHER2025</td>
                                <td className="px-6 py-4 text-sm text-gray-700">10% off on all orders</td>
                                <td className="px-6 py-4 text-sm text-gray-700">10%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">31/12/2025</td>
                                <td className="px-6 py-4 text-sm text-green-600">Active</td>
                                <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer">Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">Page 1 of 10</div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">&lt;</button>
                    <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">&gt;</button>
                </div>
            </div>
        </div>
    );
}
