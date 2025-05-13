import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceListings } from "@/components/marketplace-listings"

export default function Marketplace() {
  return (
    <div className="container mx-auto py-6 px-4">
      <MarketplaceHeader />
      <MarketplaceListings />
    </div>
  )
}
