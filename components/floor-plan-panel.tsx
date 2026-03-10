"use client"

import { cn } from "@/lib/utils"
import { Users } from "lucide-react"

type TableStatus = "available" | "occupied" | "reserved" | "needs-attention"

interface FloorTable {
  id: number
  x: number
  y: number
  seats: number
  status: TableStatus
  guestCount?: number
}

interface FloorPlanPanelProps {
  tables: FloorTable[]
  onTableClick: (tableId: number) => void
}

const statusColors: Record<TableStatus, { bg: string; border: string; text: string }> = {
  available: {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-700",
  },
  occupied: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-700",
  },
  reserved: {
    bg: "bg-sky-50",
    border: "border-sky-300",
    text: "text-sky-700",
  },
  "needs-attention": {
    bg: "bg-red-50",
    border: "border-red-400",
    text: "text-red-700",
  },
}

export function FloorPlanPanel({ tables, onTableClick }: FloorPlanPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Floor Plan</h2>
        <p className="text-muted-foreground mt-1">
          Click on a table to view details
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {(
          [
            ["available", "Available"],
            ["occupied", "Occupied"],
            ["reserved", "Reserved"],
            ["needs-attention", "Needs Attention"],
          ] as const
        ).map(([status, label]) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={cn(
                "h-3 w-3 rounded-sm border",
                statusColors[status].bg,
                statusColors[status].border
              )}
            />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Floor Grid */}
      <div className="relative bg-muted/30 rounded-xl border-2 border-dashed border-border p-8 min-h-[500px]">
        {/* Grid lines for visual effect */}
        <div className="absolute inset-4 grid grid-cols-6 grid-rows-4 gap-4 pointer-events-none opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-border rounded" />
          ))}
        </div>

        {/* Tables */}
        <div className="relative grid grid-cols-4 gap-6 md:grid-cols-6">
          {tables.map((table) => {
            const colors = statusColors[table.status]
            return (
              <button
                key={table.id}
                onClick={() => onTableClick(table.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg",
                  colors.bg,
                  colors.border,
                  table.status === "needs-attention" && "animate-pulse"
                )}
              >
                <span className={cn("text-2xl font-bold", colors.text)}>
                  {table.id}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <Users className={cn("h-3 w-3", colors.text)} />
                  <span className={cn("text-xs font-medium", colors.text)}>
                    {table.guestCount ?? 0}/{table.seats}
                  </span>
                </div>
                {table.status === "needs-attention" && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Room labels */}
        <div className="absolute top-2 left-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Main Dining Area
        </div>
      </div>
    </div>
  )
}
