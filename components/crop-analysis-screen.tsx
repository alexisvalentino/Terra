"use client"

import type React from "react"

import { ArrowLeft, Camera, Check, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "./bottom-nav"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock analysis results
const mockAnalysisResults = [
  {
    id: 1,
    cropType: "Rice Plant",
    image: "/placeholder.svg?height=160&width=280",
    status: "warning",
    title: "Possible Rice Blast Detected",
    description:
      "The leaves show signs of Rice Blast fungus (Magnaporthe oryzae). This can reduce your yield by up to 30% if left untreated.",
    recommendations: [
      "Apply fungicide containing Tricyclazole",
      "Ensure proper drainage in your field",
      "Monitor other plants for similar symptoms",
    ],
  },
  {
    id: 2,
    cropType: "Rice Plant",
    image: "/placeholder.svg?height=160&width=280",
    status: "healthy",
    title: "Healthy Plant Detected",
    description: "Your rice plant appears healthy. Continue with your current care routine.",
  },
]

export function CropAnalysisScreen() {
  const [analysisResults, setAnalysisResults] = useState(mockAnalysisResults)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCapturedImage(reader.result as string)
        analyzeImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      // Add a new analysis result
      const newResult = {
        id: Date.now(),
        cropType: "Rice Plant",
        image: imageData,
        status: Math.random() > 0.5 ? "warning" : "healthy",
        title: Math.random() > 0.5 ? "Possible Nutrient Deficiency" : "Healthy Plant Detected",
        description:
          Math.random() > 0.5
            ? "Your plant shows signs of nitrogen deficiency. The older leaves are yellowing from the tip."
            : "Your rice plant appears healthy with good coloration and leaf structure.",
        recommendations: ["Apply nitrogen-rich fertilizer", "Ensure proper irrigation", "Check soil pH levels"],
      }

      setAnalysisResults((prev) => [newResult, ...prev])
      setIsAnalyzing(false)
      setCapturedImage(null)

      toast({
        title: "Analysis Complete",
        description: "Your crop has been analyzed successfully.",
      })
    }, 3000)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-amber-500 p-4 text-white">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Crop Analysis</h1>
        </div>
      </div>

      {/* Camera section */}
      <div className="p-4 bg-amber-50 text-center">
        <p className="text-sm text-gray-700 mb-3">Take a photo of your crop to check for diseases or issues</p>

        {isAnalyzing ? (
          <div className="text-center py-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500 mx-auto mb-2"></div>
            <p className="text-sm text-amber-700">Analyzing your crop...</p>
          </div>
        ) : capturedImage ? (
          <div className="relative w-full max-w-xs mx-auto">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured"
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-white bg-opacity-50 rounded-full p-2">
                <Camera className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCapture}
            className="bg-amber-500 text-white rounded-full p-4 shadow-md hover:bg-amber-600 transition-colors"
          >
            <Camera className="w-8 h-8" />
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Analysis result */}
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="font-semibold mb-3">Recent Analysis</h3>

        {analysisResults.length > 0 ? (
          <div className="space-y-4">
            {analysisResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="h-40 bg-gray-200 relative">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.cropType}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-2 right-2 ${
                      result.status === "healthy" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    } px-2 py-1 rounded text-xs`}
                  >
                    {result.cropType}
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center mb-2">
                    {result.status === "healthy" ? (
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                    )}
                    <h4 className="font-semibold">{result.title}</h4>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{result.description}</p>

                  {result.status !== "healthy" && result.recommendations && (
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-amber-800 mb-2">Recommended Actions:</h5>
                      <ul className="text-sm space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No analysis results yet.</p>
            <p>Take a photo of your crop to get started.</p>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
