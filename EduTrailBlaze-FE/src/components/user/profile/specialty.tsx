import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const SpecialtySelector = () => {
  const specialties = [
    'Lifestyle', 
    'Business', 
    'Design', 
    'Health & Fitness', 
    'Finance & Accounting', 
    'Development', 
    'Teaching & Academics', 
    'IT & Software', 
    'Office Productivity', 
    'Marketing', 
    'Personal Development', 
    'Photography & Video', 
    'Music'
  ];

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

interface SpecialtySelectorProps {}

const toggleSpecialty = (specialty: string): void => {
    if (selectedSpecialties.includes(specialty)) {
        setSelectedSpecialties(selectedSpecialties.filter(item => item !== specialty));
    } else {
        setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
};

  const filteredSpecialties = specialties.filter(specialty => 
    specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 border-b gap-4 md:gap-0">
        <h2 className="text-xl font-medium">Specialties</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center"
        >
          {isExpanded ? "Close" : "Select Specialties"}
        </button>
      </div>

      {/* Selected specialties display */}
      <div className="p-4 md:p-6">
        <p className="text-sm text-gray-500 mb-3">Your teaching expertise areas:</p>
        <div className="flex flex-wrap gap-2">
          {selectedSpecialties.length > 0 ? (
            selectedSpecialties.map(specialty => (
              <div 
                key={specialty} 
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm"
              >
                {specialty}
                <button 
                  onClick={() => toggleSpecialty(specialty)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No specialties selected</p>
          )}
        </div>
      </div>

      {/* Specialty selector modal */}
      {isExpanded && (
        <div className="p-4 md:p-6 border-t">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSpecialties.map(specialty => (
              <div 
                key={specialty}
                onClick={() => toggleSpecialty(specialty)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center ${
                  selectedSpecialties.includes(specialty) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                  selectedSpecialties.includes(specialty) 
                    ? 'bg-blue-500' 
                    : 'border border-gray-300'
                }`}>
                  {selectedSpecialties.includes(specialty) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm">{specialty}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialtySelector;