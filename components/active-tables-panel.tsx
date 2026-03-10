"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Receipt, AlertCircle, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ActiveTable {
  id: number
  guestCount: number
  capacity: number
  seatedAt: string
  orderStatus: "pending" | "preparing" | "partially-served" | "served"
  totalAmount: number
  items: { name: string; status: "pending" | "preparing" | "ready" | "served" }[]
}

interface ActiveTablesPanelProps {
  tables: ActiveTable[]
  onRequestBill: (tableId: number) => void
  onViewDetails: (tableId: number) => void
}

const orderStatusConfig = {
  pending: { label: "Order Pending", color: "bg-slate-100 text-slate-700", progress: 0 },
  preparing: { label: "Preparing", color: "bg-amber-100 text-amber-700", progress: 33 },
  "partially-served": {
    label: "Partially Served",
    color: "bg-sky-100 text-sky-700",
    progress: 66,
  },
  served: { label: "All Served", color: "bg-emerald-100 text-emerald-700", progress: 100 },
}

export function ActiveTablesPanel({
  tables,
  onRequestBill,
  onViewDetails,
}: ActiveTablesPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Active Tables</h2>
          <p className="text-muted-foreground mt-1">
            {tables.length} table{tables.length !== 1 ? "s" : ""} currently being served
          </p>
        </div>
      </div>

      {tables.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">No active tables</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Seat guests to start serving
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => {
            const statusConfig = orderStatusConfig[table.orderStatus]
            return (
              <Card key={table.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-lg">
                        {table.id}
                      </div>
                      <div>
                        <CardTitle className="text-base">Table {table.id}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                          <Users className="h-3.5 w-3.5" />
                          <span>
                            {table.guestCount}/{table.capacity} guests
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(table.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRequestBill(table.id)}>
                          Request Bill
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={cn("text-xs", statusConfig.color)}>
                        {statusConfig.label}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Seated {table.seatedAt}</span>
                      </div>
                    </div>
                    <Progress value={statusConfig.progress} className="h-1.5" />
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-1.5">
                    {table.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">{item.name}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs capitalize",
                            item.status === "ready" &&
                              "border-amber-300 bg-amber-50 text-amber-700"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                    {table.items.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{table.items.length - 3} more items
                      </span>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Receipt className="h-4 w-4" />
                      <span>Current Total</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      ₹{table.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
