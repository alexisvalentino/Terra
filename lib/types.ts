// Marketplace types
export interface Listing {
  id: number
  title: string
  quantity: string
  price: string
  postedTime: string
  image: string
  isMine: boolean
  distance?: string
}

// Weather types
export interface WeatherData {
  location: string
  date: string
  currentTemp: number
  condition: string
  windSpeed: number
  rainChance: number
  humidity: number
  farmingAdvice: string
  forecast: ForecastDay[]
}

export interface ForecastDay {
  day: string
  temp: number
  condition: string
  icon: any
}

// Crop analysis types
export interface AnalysisResult {
  id: number
  cropType: string
  image: string
  status: "healthy" | "warning" | "danger"
  title: string
  description: string
  recommendations?: string[]
}
