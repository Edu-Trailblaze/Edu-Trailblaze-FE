'use client';
import { useState } from 'react';
import Head from 'next/head';
import { Search, Plus, MoreVertical, Edit, Trash2, Filter, Download } from 'lucide-react';

export default function StudentManagement() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Emma Johnson', email: 'emma.j@example.com', grade: 'A', status: 'Active', attendance: '95%', lastSubmission: '2 days ago' },
    { id: 2, name: 'James Wilson', email: 'james.w@example.com', grade: 'B+', status: 'Active', attendance: '88%', lastSubmission: '1 week ago' },
    { id: 3, name: 'Sophia Davis', email: 'sophia.d@example.com', grade: 'A-', status: 'Active', attendance: '92%', lastSubmission: 'Yesterday' },
    { id: 4, name: 'Liam Martinez', email: 'liam.m@example.com', grade: 'C', status: 'Inactive', attendance: '78%', lastSubmission: '3 weeks ago' },
    { id: 5, name: 'Olivia Taylor', email: 'olivia.t@example.com', grade: 'B', status: 'Active', attendance: '90%', lastSubmission: '4 days ago' },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student => {
    // Filter by search query
    if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'active' && student.status !== 'Active') {
      return false;
    }
    if (activeTab === 'inactive' && student.status !== 'Inactive') {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Student Management Dashboard</title>
        <meta name="description" content="Instructor dashboard for student management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <div className="flex">
        <aside className="hidden md:flex flex-col w-64 h-screen fixed bg-blue-800 text-white p-4">
          <div className="text-xl font-bold mb-10 mt-2">EduManager</div>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-blue-700 rounded p-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Students</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span>Courses</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Grades</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Calendar</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Settings</span>
            </div>
          </nav>
          <div className="mt-auto p-3 bg-blue-900 rounded flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold">JD</span>
            </div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-blue-200">Instructor</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {/* Mobile header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <div className="text-xl font-bold text-blue-800">EduManager</div>
            <button className="p-2 rounded bg-blue-100 text-blue-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Page header */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Students</h1>
            <p className="text-gray-600">Manage your students and their progress</p>
          </header>

          {/* Controls section */}
          <div className="mb-6 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Plus size={18} className="mr-1" />
                Add Student
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-1" />
                Filter
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Download size={18} className="mr-1" />
                Export
              </button>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="border-b mb-6">
            <nav className="flex space-x-6 -mb-px">
              <button
                className={`pb-3 px-1 ${activeTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('all')}
              >
                All Students
              </button>
              <button
                className={`pb-3 px-1 ${activeTab === 'active' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('active')}
              >
                Active
              </button>
              <button
                className={`pb-3 px-1 ${activeTab === 'inactive' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('inactive')}
              >
                Inactive
              </button>
            </nav>
          </div>

          {/* Students table */}
          <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 font-medium">Grade</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Attendance</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Last Submission</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{student.name}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{student.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{student.attendance}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{student.lastSubmission}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Edit size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-800">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Empty state */}
            {filteredStudents.length === 0 && (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-2 text-gray-700 font-medium">No students found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add a Student
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-gray-600 text-sm">
              Showing <span className="font-medium">{filteredStudents.length}</span> of <span className="font-medium">{students.length}</span> students
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-600">Previous</button>
              <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-600">Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}