"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Check, AlertTriangle, Leaf } from "lucide-react"
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

export function CropAnalysisDashboard() {
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
    <div className="md:pb-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-full md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Analyze Your Crops</CardTitle>
            <CardDescription>
              Take a photo of your crop to identify diseases and get treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing your crop...</p>
              </div>
            ) : capturedImage ? (
              <div className="relative w-full max-w-xs mx-auto">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse bg-white bg-opacity-50 rounded-full p-2">
                    <Camera className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={handleCapture} size="lg" className="gap-2 my-8">
                <Camera className="h-5 w-5" />
                Take Photo
              </Button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Our AI can identify common diseases in rice, corn, and vegetable crops
            </p>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Crop Health Overview</CardTitle>
            <CardDescription>Summary of your recent analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Healthy Crops</h3>
                </div>
                <p className="text-2xl font-bold">{analysisResults.filter((r) => r.status === "healthy").length}</p>
                <p className="text-sm text-muted-foreground mt-1">No action needed</p>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3 className="font-medium">Issues Detected</h3>
                </div>
                <p className="text-2xl font-bold">{analysisResults.filter((r) => r.status === "warning").length}</p>
                <p className="text-sm text-muted-foreground mt-1">Require attention</p>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Crops Analyzed</h3>
                </div>
                <p className="text-2xl font-bold">{analysisResults.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total analyses</p>
              </div>

              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">Available Today</h3>
                </div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground mt-1">Free analyses remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
          <TabsTrigger value="issues">Issues Detected</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analysisResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.cropType}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{result.title}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        result.status === "healthy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                      }`}
                    >
                      {result.cropType}
                    </div>
                  </div>
                  <CardDescription>{result.description}</CardDescription>
                </CardHeader>
                {result.status !== "healthy" && result.recommendations && (
                  <CardContent className="p-4 pt-0">
                    <div className="bg-muted p-3 rounded-lg">
                      <h5 className="font-medium mb-2">Recommended Actions:</h5>
                      <ul className="text-sm space-y-1">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analysisResults
              .filter((result) => result.status === "warning")
              .map((result) => (
                <Card key={result.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={result.image || "/placeholder.svg"}
                      alt={result.cropType}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{result.title}</CardTitle>
                      <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-full text-xs">
                        {result.cropType}
                      </div>
                    </div>
                    <CardDescription>{result.description}</CardDescription>
                  </CardHeader>
                  {result.recommendations && (
                    <CardContent className="p-4 pt-0">
                      <div className="bg-muted p-3 rounded-lg">
                        <h5 className="font-medium mb-2">Recommended Actions:</h5>
                        <ul className="text-sm space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
