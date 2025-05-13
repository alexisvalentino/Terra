"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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

export function WeatherDashboard() {
  const [weather, setWeather] = useState(mockWeatherData)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("current")

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6 md:pb-0">
      {/* Mobile Tabs - Only visible on small screens */}
      <div className="md:hidden">
        <Tabs defaultValue="current" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="advice">Advice</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-4">
            <WeatherCurrentCard weather={weather} />
          </TabsContent>

          <TabsContent value="forecast" className="mt-4">
            <WeatherForecastCard weather={weather} />
          </TabsContent>

          <TabsContent value="advice" className="mt-4">
            <FarmingAdviceCard weather={weather} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Grid - Hidden on mobile */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WeatherCurrentCard weather={weather} />
        <FarmingAdviceCard weather={weather} />
        <WeatherForecastCard weather={weather} className="lg:row-span-2" />
        <WeatherMapCard className="md:col-span-2 lg:col-span-2" />
      </div>

      {/* Weather Map - Only visible on mobile when map tab is active */}
      <div className="md:hidden">{activeTab === "current" && <WeatherMapCard />}</div>
    </div>
  )
}

function WeatherCurrentCard({ weather }) {
  return (
    <Card className="h-full">
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{weather.location}</h2>
            </div>
            <p className="text-sm opacity-90">{weather.date}</p>
          </div>
          <div className="bg-blue-400/50 p-2 rounded-full">
            <Sun className="h-10 w-10 text-yellow-300" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-6xl font-bold">{weather.currentTemp}°C</div>
          <p className="mt-1 text-lg">{weather.condition}</p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <Wind className="h-6 w-6 mx-auto mb-1" />
            <p className="font-semibold">{weather.windSpeed} km/h</p>
            <p className="text-xs opacity-75">Wind</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <CloudRain className="h-6 w-6 mx-auto mb-1" />
            <p className="font-semibold">{weather.rainChance}%</p>
            <p className="text-xs opacity-75">Rain</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <Droplets className="h-6 w-6 mx-auto mb-1" />
            <p className="font-semibold">{weather.humidity}%</p>
            <p className="text-xs opacity-75">Humidity</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function FarmingAdviceCard({ weather }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Farming Advice</CardTitle>
        <CardDescription>Based on today's weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{weather.farmingAdvice}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Good For</h4>
            <ul className="text-sm space-y-1 text-green-700 dark:text-green-400">
              <li>• Harvesting crops</li>
              <li>• Drying produce</li>
              <li>• Applying fertilizer</li>
            </ul>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
            <h4 className="font-medium text-red-800 dark:text-red-300 mb-1">Avoid</h4>
            <ul className="text-sm space-y-1 text-red-700 dark:text-red-400">
              <li>• Midday irrigation</li>
              <li>• Planting seedlings</li>
              <li>• Spraying pesticides</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WeatherForecastCard({ weather, className = "" }) {
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
        <CardDescription>Plan your farming activities ahead</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weather.forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-24 font-medium">{day.day}</div>
              <div className="flex items-center gap-2">
                <day.icon
                  className={`h-6 w-6 ${
                    day.condition === "sunny"
                      ? "text-amber-500"
                      : day.condition === "rain"
                        ? "text-blue-500"
                        : "text-gray-500"
                  }`}
                />
              </div>
              <div className="w-16 text-right font-semibold">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function WeatherMapCard({ className = "" }) {
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle>Weather Map</CardTitle>
        <CardDescription>Regional precipitation and temperature</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <img src="/placeholder.svg?height=300&width=600" alt="Weather map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <p className="text-white font-medium">Interactive weather map</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
