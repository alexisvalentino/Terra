"use client"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

// Mock data for marketplace listings
const mockListings = [
  {
    id: 1,
    title: "Rice (Jasmine)",
    quantity: "50 kg available",
    price: "$1.20/kg",
    postedTime: "2 days ago",
    image: "/placeholder.svg?height=200&width=300",
    isMine: true,
  },
  {
    id: 2,
    title: "Mangoes",
    quantity: "10 kg available",
    price: "$2.00/kg",
    postedTime: "From: Siti's Farm",
    distance: "5 km away",
    image: "/placeholder.svg?height=200&width=300",
    isMine: false,
  },
  {
    id: 3,
    title: "Fresh Vegetables",
    quantity: "Various types available",
    price: "$1.50/bundle",
    postedTime: "From: Nguyen's Garden",
    distance: "3 km away",
    image: "/placeholder.svg?height=200&width=300",
    isMine: false,
  },
  {
    id: 4,
    title: "Rubber",
    quantity: "100 kg available",
    price: "$3.50/kg",
    postedTime: "From: Tran's Plantation",
    distance: "8 km away",
    image: "/placeholder.svg?height=200&width=300",
    isMine: false,
  },
]

export function MarketplaceListings() {
  const [listings] = useState(mockListings)
  const { toast } = useToast()

  const myListings = listings.filter((listing) => listing.isMine)
  const otherListings = listings.filter((listing) => !listing.isMine)

  const handleContact = (title: string) => {
    toast({
      title: "Contact Request Sent",
      description: `The seller has been notified of your interest in ${title}.`,
    })
  }

  return (
    <div className="mt-6 md:pb-0">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="browse">Browse Listings</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <Badge variant="outline">{listing.distance}</Badge>
                  </div>
                  <CardDescription>{listing.quantity}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{listing.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">{listing.postedTime}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleContact(listing.title)}>
                    Contact Seller
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-listings" className="space-y-4">
          {myListings.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <CardDescription>{listing.quantity}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{listing.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted {listing.postedTime}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Listings Yet</h3>
              <p className="text-muted-foreground mb-6">You haven't added any crops to the marketplace.</p>
              <Button asChild>
                <Link href="/marketplace/add">Add Your First Listing</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
