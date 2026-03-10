"use client"

import { useState } from "react"
import { WaiterSidebar } from "@/components/waiter-sidebar"
import { ReadyOrdersPanel } from "@/components/ready-orders-panel"
import { FloorPlanPanel } from "@/components/floor-plan-panel"
import { ActiveTablesPanel } from "@/components/active-tables-panel"
import { ShiftHistoryPanel } from "@/components/shift-history-panel"
import { NotificationsPanel } from "@/components/notifications-panel"

type NavItem = "ready" | "floor" | "tables" | "history" | "notifications"

// Mock data
const mockReadyOrders = [
  {
    id: "1",
    tableNumber: 5,
    items: ["Cappuccino x2", "Avocado Toast", "Fresh Orange Juice"],
    readyAt: "2 min ago",
    priority: "urgent" as const,
  },
  {
    id: "2",
    tableNumber: 12,
    items: ["Latte", "Croissant"],
    readyAt: "5 min ago",
    priority: "normal" as const,
  },
  {
    id: "3",
    tableNumber: 8,
    items: ["Espresso", "Chocolate Muffin", "Earl Grey Tea"],
    readyAt: "1 min ago",
    priority: "normal" as const,
  },
]

const mockFloorTables = [
  { id: 1, x: 0, y: 0, seats: 2, status: "available" as const },
  { id: 2, x: 1, y: 0, seats: 2, status: "occupied" as const, guestCount: 2 },
  { id: 3, x: 2, y: 0, seats: 4, status: "reserved" as const },
  { id: 4, x: 3, y: 0, seats: 4, status: "occupied" as const, guestCount: 3 },
  { id: 5, x: 0, y: 1, seats: 4, status: "needs-attention" as const, guestCount: 4 },
  { id: 6, x: 1, y: 1, seats: 2, status: "available" as const },
  { id: 7, x: 2, y: 1, seats: 6, status: "occupied" as const, guestCount: 5 },
  { id: 8, x: 3, y: 1, seats: 4, status: "occupied" as const, guestCount: 2 },
  { id: 9, x: 0, y: 2, seats: 2, status: "available" as const },
  { id: 10, x: 1, y: 2, seats: 4, status: "reserved" as const },
  { id: 11, x: 2, y: 2, seats: 2, status: "available" as const },
  { id: 12, x: 3, y: 2, seats: 6, status: "occupied" as const, guestCount: 4 },
]

const mockActiveTables = [
  {
    id: 2,
    guestCount: 2,
    capacity: 2,
    seatedAt: "45 min ago",
    orderStatus: "served" as const,
    totalAmount: 28.5,
    items: [
      { name: "Cappuccino", status: "served" as const },
      { name: "Latte", status: "served" as const },
      { name: "Blueberry Muffin", status: "served" as const },
    ],
  },
  {
    id: 4,
    guestCount: 3,
    capacity: 4,
    seatedAt: "20 min ago",
    orderStatus: "preparing" as const,
    totalAmount: 52.0,
    items: [
      { name: "Eggs Benedict", status: "preparing" as const },
      { name: "Pancake Stack", status: "preparing" as const },
      { name: "Fresh Juice x3", status: "ready" as const },
    ],
  },
  {
    id: 5,
    guestCount: 4,
    capacity: 4,
    seatedAt: "35 min ago",
    orderStatus: "partially-served" as const,
    totalAmount: 78.5,
    items: [
      { name: "Club Sandwich", status: "served" as const },
      { name: "Caesar Salad", status: "served" as const },
      { name: "Tiramisu", status: "ready" as const },
      { name: "Espresso x2", status: "preparing" as const },
    ],
  },
  {
    id: 7,
    guestCount: 5,
    capacity: 6,
    seatedAt: "10 min ago",
    orderStatus: "pending" as const,
    totalAmount: 0,
    items: [],
  },
  {
    id: 8,
    guestCount: 2,
    capacity: 4,
    seatedAt: "55 min ago",
    orderStatus: "served" as const,
    totalAmount: 42.0,
    items: [
      { name: "Brunch Platter", status: "served" as const },
      { name: "Mimosa x2", status: "served" as const },
    ],
  },
  {
    id: 12,
    guestCount: 4,
    capacity: 6,
    seatedAt: "25 min ago",
    orderStatus: "partially-served" as const,
    totalAmount: 95.0,
    items: [
      { name: "Wagyu Burger", status: "served" as const },
      { name: "Truffle Fries", status: "served" as const },
      { name: "Lobster Roll", status: "preparing" as const },
      { name: "Cheesecake", status: "pending" as const },
    ],
  },
]

const mockShiftStats = {
  tablesServed: 12,
  totalSales: 486.5,
  avgServiceTime: "28 min",
  tipsEarned: 72.0,
}

const mockShiftEvents = [
  {
    id: "1",
    time: "2:45 PM",
    type: "payment" as const,
    tableNumber: 3,
    description: "Payment received",
    amount: 45.5,
  },
  {
    id: "2",
    time: "2:30 PM",
    type: "completed" as const,
    tableNumber: 3,
    description: "Table closed",
  },
  {
    id: "3",
    time: "2:15 PM",
    type: "order" as const,
    tableNumber: 5,
    description: "Order placed - 3 items",
  },
  {
    id: "4",
    time: "2:00 PM",
    type: "seated" as const,
    tableNumber: 5,
    description: "4 guests seated",
  },
  {
    id: "5",
    time: "1:45 PM",
    type: "payment" as const,
    tableNumber: 9,
    description: "Payment received",
    amount: 38.0,
  },
  {
    id: "6",
    time: "1:30 PM",
    type: "order" as const,
    tableNumber: 12,
    description: "Order placed - 5 items",
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "order-ready" as const,
    title: "Order Ready",
    message: "Cappuccino and Avocado Toast ready for pickup",
    time: "2 min ago",
    read: false,
    tableNumber: 5,
  },
  {
    id: "2",
    type: "table-request" as const,
    title: "Table Request",
    message: "Guest is requesting assistance",
    time: "5 min ago",
    read: false,
    tableNumber: 8,
  },
  {
    id: "3",
    type: "manager" as const,
    title: "Manager Note",
    message: "Please check on VIP guests at Table 12",
    time: "15 min ago",
    read: false,
    tableNumber: 12,
  },
  {
    id: "4",
    type: "reminder" as const,
    title: "Reminder",
    message: "Table 4 has been waiting 25+ minutes",
    time: "20 min ago",
    read: true,
    tableNumber: 4,
  },
  {
    id: "5",
    type: "order-ready" as const,
    title: "Order Ready",
    message: "Desserts ready for Table 7",
    time: "25 min ago",
    read: true,
    tableNumber: 7,
  },
]

export default function WaiterDashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>("ready")
  const [readyOrders, setReadyOrders] = useState(mockReadyOrders)
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleMarkDelivered = (orderId: string) => {
    setReadyOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  const handleTableClick = (tableId: number) => {
    console.log("Table clicked:", tableId)
  }

  const handleRequestBill = (tableId: number) => {
    console.log("Bill requested for table:", tableId)
  }

  const handleViewDetails = (tableId: number) => {
    console.log("View details for table:", tableId)
  }

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const renderPanel = () => {
    switch (activeNav) {
      case "ready":
        return (
          <ReadyOrdersPanel
            orders={readyOrders}
            onMarkDelivered={handleMarkDelivered}
          />
        )
      case "floor":
        return (
          <FloorPlanPanel tables={mockFloorTables} onTableClick={handleTableClick} />
        )
      case "tables":
        return (
          <ActiveTablesPanel
            tables={mockActiveTables}
            onRequestBill={handleRequestBill}
            onViewDetails={handleViewDetails}
          />
        )
      case "history":
        return (
          <ShiftHistoryPanel stats={mockShiftStats} events={mockShiftEvents} />
        )
      case "notifications":
        return (
          <NotificationsPanel
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onDismiss={handleDismissNotification}
            onMarkAllRead={handleMarkAllRead}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <WaiterSidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        readyOrdersCount={readyOrders.length}
        notificationCount={notifications.filter((n) => !n.read).length}
      />
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-6 lg:p-8 max-w-6xl">{renderPanel()}</div>
      </main>
    </div>
  )
}
