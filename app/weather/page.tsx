import { WeatherDashboard } from "@/components/weather-dashboard"

export default function Weather() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
      <WeatherDashboard />
    </div>
  )
}
