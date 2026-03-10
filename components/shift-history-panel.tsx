"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, Users, Clock, TrendingUp, CheckCircle2 } from "lucide-react"

interface ShiftStats {
  tablesServed: number
  totalSales: number
  avgServiceTime: string
  tipsEarned: number
}

interface ShiftEvent {
  id: string
  time: string
  type: "seated" | "order" | "payment" | "completed"
  tableNumber: number
  description: string
  amount?: number
}

interface ShiftHistoryPanelProps {
  stats: ShiftStats
  events: ShiftEvent[]
}

const eventTypeConfig = {
  seated: { icon: Users, color: "bg-sky-100 text-sky-700" },
  order: { icon: Clock, color: "bg-amber-100 text-amber-700" },
  payment: { icon: IndianRupee, color: "bg-emerald-100 text-emerald-700" },
  completed: { icon: CheckCircle2, color: "bg-slate-100 text-slate-700" },
}

export function ShiftHistoryPanel({ stats, events }: ShiftHistoryPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Shift History</h2>
        <p className="text-muted-foreground mt-1">Your activity this shift</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.tablesServed}</p>
                <p className="text-xs text-muted-foreground">Tables Served</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <IndianRupee className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.totalSales.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Total Sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgServiceTime}</p>
                <p className="text-xs text-muted-foreground">Avg Service</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
                <TrendingUp className="h-5 w-5 text-sky-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.tipsEarned.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Tips Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4">
            {/* Timeline line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />

            {events.map((event, idx) => {
              const config = eventTypeConfig[event.type]
              const Icon = config.icon
              return (
                <div key={event.id} className="relative flex gap-4">
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Table {event.tableNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">
                          {event.time}
                        </span>
                        {event.amount && (
                          <p className="text-sm font-medium text-emerald-600">
                            +₹{event.amount.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
