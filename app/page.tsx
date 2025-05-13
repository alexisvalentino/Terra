import { HomeHero } from "@/components/home-hero"
import { FeatureCards } from "@/components/feature-cards"
import { FarmingTips } from "@/components/farming-tips"
import { ValueProposition } from "@/components/value-proposition"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <HomeHero />
      <ValueProposition />
      <FeatureCards />
      <FarmingTips />
    </div>
  )
}
