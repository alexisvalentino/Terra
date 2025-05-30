import { CropAnalysisDashboard } from "@/components/crop-analysis-dashboard"

export default function Analyze() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Crop Analysis</h1>
      <CropAnalysisDashboard />
    </div>
  )
}
