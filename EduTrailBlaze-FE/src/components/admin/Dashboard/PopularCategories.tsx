"use client"

import { useState } from "react"

export default function PopularCategories() {
  const categories = [
    {
      name: "Teaching & Academics",
      count: 5.3,
      icon: "📚",
      color: "from-green-50 to-green-100",
      textColor: "text-green-700",
    },
    { name: "Development", count: 4.8, icon: "💻", color: "from-blue-50 to-blue-100", textColor: "text-blue-700" },
    { name: "Business", count: 3.9, icon: "💼", color: "from-indigo-50 to-indigo-100", textColor: "text-indigo-700" },
    {
      name: "Finance & Accounting",
      count: 4.2,
      icon: "💰",
      color: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700",
    },
    { name: "IT & Software", count: 5.1, icon: "🖥️", color: "from-gray-50 to-gray-100", textColor: "text-gray-700" },
    { name: "Design", count: 3.6, icon: "🎨", color: "from-purple-50 to-purple-100", textColor: "text-purple-700" },
    { name: "Health & Fitness", count: 4.0, icon: "🏋️‍♂️", color: "from-pink-50 to-pink-100", textColor: "text-pink-700" },
    { name: "Lifestyle", count: 4.5, icon: "🏡", color: "from-red-50 to-red-100", textColor: "text-red-700" },
    { name: "Marketing", count: 3.7, icon: "📢", color: "from-orange-50 to-orange-100", textColor: "text-orange-700" },
    { name: "Music", count: 4.3, icon: "🎵", color: "from-teal-50 to-teal-100", textColor: "text-teal-700" },
    {
      name: "Office Productivity",
      count: 4.6,
      icon: "📊",
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-800",
    },
    {
      name: "Personal Development",
      count: 4.9,
      icon: "🌟",
      color: "from-green-50 to-green-100",
      textColor: "text-green-800",
    },
    {
      name: "Photography & Video",
      count: 3.8,
      icon: "📷",
      color: "from-gray-50 to-gray-100",
      textColor: "text-gray-800",
    },
  ]

  const sortedCategories = [...categories].sort((a, b) => b.count - a.count)

  const [showAll, setShowAll] = useState(false)

  const displayedCategories = showAll ? sortedCategories : sortedCategories.slice(0, 8)

  return (
    <div
      className="rounded-lg p-5 h-full"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-blue-900">Popular Categories</h2>
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-3 py-1.5 rounded-md bg-blue-600/10 text-blue-700 hover:bg-blue-600/20 transition-colors font-medium text-sm"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {displayedCategories.map((category, index) => (
          <div 
            key={index} 
            className="flex items-center p-3 rounded-lg transition-all hover:shadow-sm"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="text-2xl mr-3 p-2 rounded-full bg-white/50">{category.icon}</div>
            <div>
              <div className="font-medium text-blue-900 text-sm">{category.name}</div>
              <div className="text-xs font-medium text-blue-700">{category.count}k students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

