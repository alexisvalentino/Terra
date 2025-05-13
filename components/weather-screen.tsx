"use client"

import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./bottom-nav"
import { useState, useEffect } from "react"

// Mock weather data
const mockWeatherData = {
  location: "Bandung, Indonesia",
  date: "Monday, April 13",
  currentTemp: 29,
  condition: "Sunny, clear skies",
  windSpeed: 8,
  rainChance: 10,
  humidity: 65,
  farmingAdvice: "Good day for harvesting. Consider watering crops in the evening as temperatures will remain high.",
  forecast: [
    { day: "Tuesday", temp: 27, condition: "rain", icon: CloudRain },
    { day: "Wednesday", temp: 26, condition: "rain", icon: CloudRain },
    { day: "Thursday", temp: 30, condition: "sunny", icon: Sun },
    { day: "Friday", temp: 31, condition: "sunny", icon: Sun },
    { day: "Saturday", temp: 29, condition: "cloudy", icon: Cloud },
    { day: "Sunday", temp: 28, condition: "cloudy", icon: Cloud },
    { day: "Monday", temp: 30, condition: "sunny", icon: Sun },
  ],
}

export function WeatherScreen() {
  const [weather, setWeather] = useState(mockWeatherData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 p-4 text-white">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Weather Forecast</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Current weather */}
          <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white p-6 text-center">
            <h2 className="text-lg font-semibold mb-1">{weather.location}</h2>
            <p className="text-sm mb-4">{weather.date}</p>

            <div className="flex justify-center mb-2">
              <Sun className="w-16 h-16" />
            </div>

            <div className="text-4xl font-bold mb-2">{weather.currentTemp}°C</div>
            <p>{weather.condition}</p>

            <div className="flex justify-around mt-4 text-sm">
              <div>
                <Wind className="w-5 h-5 mx-auto mb-1" />
                <p>{weather.windSpeed} km/h</p>
              </div>
              <div>
                <CloudRain className="w-5 h-5 mx-auto mb-1" />
                <p>{weather.rainChance}%</p>
              </div>
              <div>
                <Droplets className="w-5 h-5 mx-auto mb-1" />
                <p>{weather.humidity}%</p>
              </div>
            </div>
          </div>

          {/* Farming advice */}
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Farming Advice:</h3>
            <p className="text-sm text-gray-700">{weather.farmingAdvice}</p>
          </div>

          {/* Weekly forecast */}
          <div className="flex-1 p-4 overflow-auto">
            <h3 className="font-semibold mb-3">7-Day Forecast</h3>

            <div className="space-y-3">
              {weather.forecast.map((day, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm">
                  <span className="font-medium">{day.day}</span>
                  <div className="flex items-center">
                    <day.icon
                      className={`w-5 h-5 mr-2 ${
                        day.condition === "sunny"
                          ? "text-amber-500"
                          : day.condition === "rain"
                            ? "text-blue-500"
                            : "text-gray-500"
                      }`}
                    />
                    <span>{day.temp}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
