"use client"

import type React from "react"

import { ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AddListingScreen() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    unit: "kg",
    price: "",
    description: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Listing Added Successfully",
        description: `Your ${formData.title} has been listed on the marketplace.`,
      })
      setIsSubmitting(false)
      router.push("/marketplace")
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-green-600 p-4 text-white">
        <div className="flex items-center">
          <Link href="/marketplace" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Add New Listing</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Photo</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-40">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="mx-auto max-h-40 rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImagePreview(null)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">Click to upload a photo</p>
                </div>
              )}
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          {/* Crop details */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Crop Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Rice, Mangoes, Vegetables"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Amount"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="ton">Tons</option>
                <option value="bundle">Bundles</option>
                <option value="piece">Pieces</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (per unit)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                placeholder="0.00"
                required
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Add details about your crop quality, harvest date, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSubmitting ? "Adding Listing..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  )
}
