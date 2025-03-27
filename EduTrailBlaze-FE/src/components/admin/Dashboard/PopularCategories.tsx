import React, { useState } from "react"

export default function PopularCategories() {
  // Mock data với count là số, biểu thị số lượng theo đơn vị "k"
  const categories = [
    { name: "Teaching & Academics", count: 5.3, icon: "📚", color: "bg-green-100 text-green-700" },
    { name: "Development", count: 4.8, icon: "💻", color: "bg-blue-100 text-blue-700" },
    { name: "Business", count: 3.9, icon: "💼", color: "bg-indigo-100 text-indigo-700" },
    { name: "Finance & Accounting", count: 4.2, icon: "💰", color: "bg-yellow-100 text-yellow-700" },
    { name: "IT & Software", count: 5.1, icon: "🖥️", color: "bg-gray-100 text-gray-700" },
    { name: "Design", count: 3.6, icon: "🎨", color: "bg-purple-100 text-purple-700" },
    { name: "Health & Fitness", count: 4.0, icon: "🏋️‍♂️", color: "bg-pink-100 text-pink-700" },
    { name: "Lifestyle", count: 4.5, icon: "🏡", color: "bg-red-100 text-red-700" },
    { name: "Marketing", count: 3.7, icon: "📢", color: "bg-orange-100 text-orange-700" },
    { name: "Music", count: 4.3, icon: "🎵", color: "bg-teal-100 text-teal-700" },
    { name: "Office Productivity", count: 4.6, icon: "📊", color: "bg-blue-50 text-blue-800" },
    { name: "Personal Development", count: 4.9, icon: "🌟", color: "bg-green-50 text-green-800" },
    { name: "Photography & Video", count: 3.8, icon: "📷", color: "bg-gray-50 text-gray-800" },
  ]

  // Sắp xếp danh sách theo count giảm dần
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count)

  // State để quản lý hiển thị danh sách đầy đủ hay chỉ 6 category đầu
  const [showAll, setShowAll] = useState(false)

  // Nếu không showAll thì chỉ hiển thị 6 category có count cao nhất
  const displayedCategories = showAll ? sortedCategories : sortedCategories.slice(0, 8)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">Popular Categories</h2>
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {displayedCategories.map((category, index) => (
          <div key={index} className={`flex items-center p-3 rounded-lg shadow-sm ${category.color}`}>
            <div className="text-2xl mr-3">{category.icon}</div>
            <div>
              <div className="font-medium">{category.name}</div>
              <div className="text-xs opacity-80">{category.count}k students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
