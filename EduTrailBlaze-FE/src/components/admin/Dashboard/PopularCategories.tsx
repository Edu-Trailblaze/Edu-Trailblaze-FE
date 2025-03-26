import React from "react"

export default function PopularCategories() {
  // Nếu cần gọi API để lấy danh sách category, bạn có thể làm như:
  // const { data, isLoading, isError } = useGetPopularCategoriesQuery()
  // Ở ví dụ này mình tạm mock data cứng
  const categories = [
    { name: "Programming", count: "4.4k", icon: "💻", color: "bg-blue-100 text-blue-700" },
    { name: "Design", count: "3.6k", icon: "🎨", color: "bg-purple-100 text-purple-700" },
    // ...
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border-0 shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-900">Popular Categories</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div key={index} className={`flex items-center p-3 rounded-lg shadow-sm ${category.color}`}>
            <div className="text-2xl mr-3">{category.icon}</div>
            <div>
              <div className="font-medium">{category.name}</div>
              <div className="text-xs opacity-80">{category.count} students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
