import type React from "react"

export function MobileAppPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-8 border-gray-800 rounded-[40px] overflow-hidden shadow-xl mx-auto max-w-[280px]">
      <div className="bg-black h-6 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1 w-20 h-1 bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-[500px] bg-white overflow-hidden">{children}</div>
      <div className="bg-black h-10 flex justify-center items-center">
        <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  )
}
