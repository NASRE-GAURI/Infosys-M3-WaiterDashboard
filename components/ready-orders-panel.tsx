"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadyOrder {
  id: string
  tableNumber: number
  items: string[]
  readyAt: string
  priority: "normal" | "urgent"
}

interface ReadyOrdersPanelProps {
  orders: ReadyOrder[]
  onMarkDelivered: (orderId: string) => void
}

export function ReadyOrdersPanel({ orders, onMarkDelivered }: ReadyOrdersPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Ready for Pickup</h2>
          <p className="text-muted-foreground mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} ready to serve
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ChefHat className="h-6 w-6 text-primary" />
        </div>
      </div>

      {orders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">All caught up!</h3>
            <p className="text-muted-foreground text-sm mt-1">
              No orders waiting for pickup
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className={cn(
                "transition-all hover:shadow-md",
                order.priority === "urgent" && "border-l-4 border-l-destructive"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                      {order.tableNumber}
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        Table {order.tableNumber}
                      </CardTitle>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Ready {order.readyAt}</span>
                      </div>
                    </div>
                  </div>
                  {order.priority === "urgent" && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5 mb-4">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-foreground flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => onMarkDelivered(order.id)}
                  className="w-full"
                  size="sm"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
