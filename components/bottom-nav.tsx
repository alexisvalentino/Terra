"use client"

import { Home, ShoppingBasket, Cloud, Camera } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBasket, label: "Market", href: "/marketplace" },
    { icon: Cloud, label: "Weather", href: "/weather" },
    { icon: Camera, label: "Analyze", href: "/analyze" },
  ]

  return (
    <div className="bg-white border-t border-gray-200 p-2 flex justify-around">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("p-2 flex flex-col items-center", isActive ? "text-green-600" : "text-gray-500")}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
