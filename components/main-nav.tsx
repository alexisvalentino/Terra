"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBasket, Cloud, Camera, Menu, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Add this near the top of the component where we check the pathname
  const isMarketplacePage = pathname.startsWith("/marketplace")

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      icon: ShoppingBasket,
      active: pathname.startsWith("/marketplace"),
    },
    {
      href: "/weather",
      label: "Weather",
      icon: Cloud,
      active: pathname.startsWith("/weather"),
    },
    {
      href: "/analyze",
      label: "Analyze",
      icon: Camera,
      active: pathname.startsWith("/analyze"),
    },
  ]

  return (
    <>
      {/* Top header - always visible */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          {/* Desktop logo and navigation */}
          <div className="hidden md:flex md:flex-1 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl text-green-600">Terra</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    route.active ? "text-foreground font-semibold" : "text-foreground/60",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <route.icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile hamburger menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold text-green-600 mb-8"
                onClick={() => setIsOpen(false)}
              >
                Terra
              </Link>
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium",
                      route.active ? "text-foreground font-semibold" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile logo (centered) */}
          <div className="flex md:hidden flex-1 justify-center">
            <Link href="/" className="font-bold text-xl text-green-600">
              Terra
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {isMobile
              ? !isMarketplacePage && (
                  <Link href="/marketplace/add">
                    <Button size="icon" className="rounded-full md:hidden">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                )
              : !isMarketplacePage && (
                  <Button asChild className="hidden md:flex">
                    <Link href="/marketplace/add">Add Listing</Link>
                  </Button>
                )}
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                route.active ? "text-green-600 font-medium" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span className="text-xs">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
