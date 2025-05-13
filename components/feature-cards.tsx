import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBasket, Cloud, Camera, Users } from "lucide-react"
import Link from "next/link"

export function FeatureCards() {
  const features = [
    {
      icon: ShoppingBasket,
      title: "Direct-to-Customer Marketplace",
      description: "Sell your crops directly to customers without middlemen, increasing your profits",
      href: "/marketplace",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Cloud,
      title: "Weather Forecast",
      description: "Get accurate weather predictions to plan your farming activities",
      href: "/weather",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Camera,
      title: "AI-Powered Crop Analysis",
      description: "Identify crop diseases and get treatment recommendations using AI technology",
      href: "/analyze",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Users,
      title: "Farmer Community",
      description: "Connect with other farmers to share knowledge and experiences",
      href: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Farmer-Friendly & Accessible</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Designed specifically for Southeast Asian farmers with an easy-to-use interface that works on any device, even
          with limited connectivity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Link key={index} href={feature.href} className="transition-transform hover:scale-105 h-full">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-2`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
