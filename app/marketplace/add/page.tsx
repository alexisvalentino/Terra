import { AddListingForm } from "@/components/add-listing-form"

export default function AddListing() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Listing</h1>
      <AddListingForm />
    </div>
  )
}
