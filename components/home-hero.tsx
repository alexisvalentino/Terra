import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomeHero() {
  return (
    <div className="relative">
      <div className="bg-green-600 dark:bg-green-800 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">Terra</h1>
                <p className="max-w-[600px] text-white md:text-xl">
                  Empowering Southeast Asian farmers to sell their produce directly to customers and improve their
                  yields.
                </p>
                <p className="max-w-[600px] text-white/80 mt-2">
                  Leveraging a marketplace model and AI-powered tools, while keeping the interface farmer-friendly and
                  accessible.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
                  <Link href="/analyze">Analyze Crops</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-full md:h-[350px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg opacity-20 animate-pulse"></div>
                <img
                  src="/placeholder.svg?height=450&width=600"
                  alt="Farmer in field"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
