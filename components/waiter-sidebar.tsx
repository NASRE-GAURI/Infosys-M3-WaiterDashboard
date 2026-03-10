"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChefHat,
  LayoutGrid,
  Table,
  History,
  Bell,
  LogOut,
  Coffee,
  User,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type NavItem = "ready" | "floor" | "tables" | "history" | "notifications"

interface WaiterSidebarProps {
  activeNav: NavItem
  onNavChange: (nav: NavItem) => void
  readyOrdersCount: number
  notificationCount: number
}

export function WaiterSidebar({
  activeNav,
  onNavChange,
  readyOrdersCount,
  notificationCount,
}: WaiterSidebarProps) {
  const navItems = [
    {
      id: "ready" as const,
      label: "Ready Orders",
      icon: ChefHat,
      badge: readyOrdersCount,
    },
    { id: "floor" as const, label: "Floor Plan", icon: LayoutGrid },
    { id: "tables" as const, label: "Active Tables", icon: Table },
    { id: "history" as const, label: "Shift History", icon: History },
    {
      id: "notifications" as const,
      label: "Notifications",
      icon: Bell,
      badge: notificationCount,
    },
  ]

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
          <Coffee className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Bookáfe</h1>
          <p className="text-xs text-sidebar-foreground/60">Waiter Dashboard</p>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
          <User className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">Sarah Johnson</p>
          <p className="text-xs text-sidebar-foreground/60">Floor 1 - Section A</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-400" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "h-5 min-w-5 px-1.5 text-xs font-semibold",
                    item.id === "ready"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
          <LogOut className="h-5 w-5" />
          <span>End Shift</span>
        </button>
      </div>
    </aside>
  )
}
