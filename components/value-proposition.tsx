import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react"

export function ValueProposition() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Profits",
      description: "Earn up to 40% more by selling directly to customers without middlemen",
      color: "text-green-600",
    },
    {
      icon: CheckCircle2,
      title: "Improved Crop Yields",
      description: "AI-powered analysis helps identify and treat crop issues early",
      color: "text-amber-600",
    },
    {
      icon: Users,
      title: "Direct Customer Relationships",
      description: "Build a loyal customer base and understand market demands better",
      color: "text-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "Accessible Technology",
      description: "Designed for all farmers, regardless of technical expertise",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why Terra Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines direct marketplace access with AI-powered tools to help farmers succeed
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <benefit.icon className={`h-12 w-12 ${benefit.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
