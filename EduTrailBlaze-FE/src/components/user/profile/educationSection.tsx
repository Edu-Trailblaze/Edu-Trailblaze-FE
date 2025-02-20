'use client'
import React, { useState } from 'react';
import { GraduationCap, ChevronDown, PenSquare, Plus, ExternalLink } from 'lucide-react';

const EducationSection = () => {
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <div className=" mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      {/* Credentials Section */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Credentials</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <ExternalLink size={16} />
            </button>
          </div>
          <button className="flex items-center text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full border border-blue-600">
            <Plus size={16} className="mr-1" />
            Add
          </button>
        </div>

        {/* Bachelor's Degree */}
        <div className="flex items-start gap-4 mb-6 group">
          <div className="bg-gray-100 p-3 rounded-lg">
            <GraduationCap className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">Bachelor's degree</h4>
              <button className="opacity-0 group-hover:opacity-100 text-blue-600">
                <PenSquare size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* CertNexus Certificates */}
        <div className="space-y-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src="assets/Side_Image/course_image.png" alt="CertNexus" className="rounded w-[120px] h-[80px]" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">CertNexus Certified Ethical Emerging Technologist Professional Certificate</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Leadership and Management', 'Critical Thinking', 'Strategy and Operations', 'Human Learning', 'Machine Learning'].map((skill) => (
                    <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  <span className="text-blue-600 text-sm cursor-pointer">+5 more</span>
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline block mb-1">View certificate</a>
                <p className="text-sm text-gray-600">
                  {index === 0 ? '8 month program • Completed August 2024' : 'Completed August 2024'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="w-full mt-6 flex items-center justify-center text-blue-600 hover:bg-blue-50 py-2 rounded-lg"
          onClick={() => setShowAllCredentials(!showAllCredentials)}
        >
          <ChevronDown className={`mr-1 transform ${showAllCredentials ? 'rotate-180' : ''}`} size={16} />
          Show all 10 credentials
        </button>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-semibold">Courses</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="space-y-6">
          {['Project Management Project', 'Managing Project Risks and Changes', 'Budgeting and Scheduling Projects'].map((course, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src="assets/Side_Image/course_image.png" alt="UCI" className="rounded w-[120px] h-[80px]" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">University of California, Irvine · Course</p>
                <h4 className="font-semibold mb-2">{course}</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Project Management', 'Strategy and Operations', 'Leadership and Management'].slice(0, index + 2).map((skill) => (
                    <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {index > 0 && <span className="text-blue-600 text-sm cursor-pointer">+5 more</span>}
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline block mb-1">View certificate</a>
                <p className="text-sm text-gray-600">
                  Completed {index === 2 ? 'January' : 'February'} 2025
                </p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="w-full mt-6 flex items-center justify-center text-blue-600 hover:bg-blue-50 py-2 rounded-lg"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          <ChevronDown className={`mr-1 transform ${showAllCourses ? 'rotate-180' : ''}`} size={16} />
          Show all 10 courses
        </button>
      </div>
    </div>
  );
};

export default EducationSection;