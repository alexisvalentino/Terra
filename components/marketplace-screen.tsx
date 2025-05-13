"use client"

import { ArrowLeft, Plus, Search } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./bottom-nav"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock data for marketplace listings
const mockListings = [
  {
    id: 1,
    title: "Rice (Jasmine)",
    quantity: "50 kg available",
    price: "$1.20/kg",
    postedTime: "2 days ago",
    image: "/placeholder.svg?height=80&width=80",
    isMine: true,
  },
  {
    id: 2,
    title: "Mangoes",
    quantity: "10 kg available",
    price: "$2.00/kg",
    postedTime: "From: Siti's Farm",
    distance: "5 km away",
    image: "/placeholder.svg?height=80&width=80",
    isMine: false,
  },
  {
    id: 3,
    title: "Fresh Vegetables",
    quantity: "Various types available",
    price: "$1.50/bundle",
    postedTime: "From: Nguyen's Garden",
    distance: "3 km away",
    image: "/placeholder.svg?height=80&width=80",
    isMine: false,
  },
  {
    id: 4,
    title: "Rubber",
    quantity: "100 kg available",
    price: "$3.50/kg",
    postedTime: "From: Tran's Plantation",
    distance: "8 km away",
    image: "/placeholder.svg?height=80&width=80",
    isMine: false,
  },
]

export function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [listings, setListings] = useState(mockListings)
  const { toast } = useToast()

  const myListings = listings.filter((listing) => listing.isMine)
  const otherListings = listings.filter((listing) => !listing.isMine)

  const filteredOtherListings = otherListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContact = (title: string) => {
    toast({
      title: "Contact Request Sent",
      description: `The seller has been notified of your interest in ${title}.`,
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-green-600 p-4 text-white">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Marketplace</h1>
        </div>
      </div>

      {/* Search and filter */}
      <div className="p-3 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search crops..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* My listings section */}
      <div className="p-4 bg-green-50">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">My Listings</h2>
          <Link href="/marketplace/add" className="bg-green-600 text-white p-1 rounded-full">
            <Plus className="w-5 h-5" />
          </Link>
        </div>

        {myListings.length > 0 ? (
          myListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm p-3 mb-4">
              <div className="flex">
                <div className="w-20 h-20 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.quantity}</p>
                  <p className="text-green-600 font-semibold">{listing.price}</p>
                  <p className="text-xs text-gray-500">Posted {listing.postedTime}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>You haven't listed any crops yet.</p>
            <Link href="/marketplace/add" className="text-green-600 font-medium">
              Add your first listing
            </Link>
          </div>
        )}
      </div>

      {/* Market listings */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="font-semibold mb-3">Available in Your Area</h2>

        {filteredOtherListings.length > 0 ? (
          <div className="space-y-4">
            {filteredOtherListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-sm p-3">
                <div className="flex">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{listing.title}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {listing.distance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{listing.quantity}</p>
                    <p className="text-green-600 font-semibold">{listing.price}</p>
                    <p className="text-xs text-gray-500">{listing.postedTime}</p>
                    <button
                      className="mt-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                      onClick={() => handleContact(listing.title)}
                    >
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No crops matching "{searchQuery}" found nearby.</p>
            <p className="mt-2">Try a different search term or check back later.</p>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
