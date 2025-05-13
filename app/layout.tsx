import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Terra - For Southeast Asian Farmers",
  description: "Connect directly with customers and improve your yields",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1 bg-background pb-safe">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
