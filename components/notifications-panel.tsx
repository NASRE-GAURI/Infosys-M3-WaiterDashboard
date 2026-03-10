"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  ChefHat,
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "order-ready" | "table-request" | "manager" | "reminder"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  tableNumber?: number
}

interface NotificationsPanelProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onDismiss: (id: string) => void
  onMarkAllRead: () => void
}

const typeConfig = {
  "order-ready": {
    icon: ChefHat,
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-l-amber-400",
  },
  "table-request": {
    icon: Bell,
    color: "bg-red-100 text-red-700",
    borderColor: "border-l-red-400",
  },
  manager: {
    icon: MessageSquare,
    color: "bg-sky-100 text-sky-700",
    borderColor: "border-l-sky-400",
  },
  reminder: {
    icon: Clock,
    color: "bg-slate-100 text-slate-700",
    borderColor: "border-l-slate-400",
  },
}

export function NotificationsPanel({
  notifications,
  onMarkRead,
  onDismiss,
  onMarkAllRead,
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={onMarkAllRead}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">No notifications</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {"You're all caught up!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type]
            const Icon = config.icon
            return (
              <Card
                key={notification.id}
                className={cn(
                  "border-l-4 transition-all",
                  config.borderColor,
                  !notification.read && "bg-muted/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        config.color
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">
                              {notification.title}
                            </h4>
                            {notification.tableNumber && (
                              <Badge variant="outline" className="text-xs">
                                Table {notification.tableNumber}
                              </Badge>
                            )}
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDismiss(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 mt-2 text-xs"
                          onClick={() => onMarkRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
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
