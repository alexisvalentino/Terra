"use client"

import { ShoppingBasket, Cloud, Camera } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./bottom-nav"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

export function HomeScreen() {
  const { toast } = useToast()
  const [userName, setUserName] = useState("Joko")
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Simulate first-time login
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setShowWelcome(true)
      localStorage.setItem("hasVisited", "true")

      // Show welcome toast
      setTimeout(() => {
        toast({
          title: "Welcome to Terra!",
          description: "Your farming companion app is ready to use.",
        })
      }, 1000)
    }
  }, [toast])

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Terra</h1>
          <div className="flex items-center space-x-2">
            <select className="text-sm bg-green-500 text-white border-none rounded px-2 py-1">
              <option>Bahasa</option>
              <option>English</option>
              <option>Thai</option>
              <option>Vietnamese</option>
            </select>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-sm font-bold">{userName.substring(0, 2).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="p-4 bg-green-100">
        <h2 className="text-lg font-semibold">Welcome, {userName}!</h2>
        <p className="text-sm text-gray-700">What would you like to do today?</p>
      </div>

      {/* Main menu buttons */}
      <div className="flex-1 p-6 flex flex-col space-y-4">
        <Link
          href="/marketplace"
          className="bg-green-600 text-white rounded-xl p-4 flex items-center shadow-md hover:bg-green-700 transition-colors"
        >
          <ShoppingBasket className="w-8 h-8 mr-3" />
          <span className="text-xl font-semibold">Sell My Crops</span>
        </Link>

        <Link
          href="/weather"
          className="bg-blue-500 text-white rounded-xl p-4 flex items-center shadow-md hover:bg-blue-600 transition-colors"
        >
          <Cloud className="w-8 h-8 mr-3" />
          <span className="text-xl font-semibold">Check Weather</span>
        </Link>

        <Link
          href="/analyze"
          className="bg-amber-500 text-white rounded-xl p-4 flex items-center shadow-md hover:bg-amber-600 transition-colors"
        >
          <Camera className="w-8 h-8 mr-3" />
          <span className="text-xl font-semibold">Analyze Crops</span>
        </Link>
      </div>

      {/* Bottom navigation */}
      <BottomNav />

      {/* First-time welcome modal */}
      {showWelcome && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowWelcome(false)}
        >
          <div className="bg-white p-6 rounded-lg max-w-xs mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-green-700 mb-2">Welcome to Terra!</h3>
            <p className="mb-4">
              Your farming companion app is here to help you sell crops directly and improve your yields.
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg" onClick={() => setShowWelcome(false)}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
