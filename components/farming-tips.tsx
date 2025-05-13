import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FarmingTips() {
  const tips = [
    {
      title: "Crop Rotation",
      description: "Rotate your crops each season to prevent soil depletion and reduce pest problems.",
    },
    {
      title: "Water Management",
      description: "Water your crops early in the morning to reduce evaporation and fungal growth.",
    },
    {
      title: "Natural Pest Control",
      description: "Use companion planting and natural predators to control pests without chemicals.",
    },
  ]

  return (
    <div className="container px-4 md:px-6">
      <div className="bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Farming Tips</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tip.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
