"use client";

import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Sun,
  Moon,
  MessageSquare,
  ClipboardList,
  Trash2,
  CheckCircle,
  AlertCircle,
  Truck,
} from "lucide-react";

const MOCK_NOTIFICATIONS = [
  { id: "1", type: "order", title: "New Order", message: "ORD-2024-009 placed by Ahmed Khan", time: "2 min ago", read: false, icon: ShoppingCart, color: "text-blue-500" },
  { id: "2", type: "low_stock", title: "Low Stock Alert", message: "DASTAN — CHAPTER IV only 5 left", time: "15 min ago", read: false, icon: AlertCircle, color: "text-amber-500" },
  { id: "3", type: "review", title: "New Review", message: "5-star review for NAQSH RING", time: "1 hour ago", read: true, icon: MessageSquare, color: "text-green-500" },
  { id: "4", type: "order", title: "Order Shipped", message: "ORD-2024-005 shipped via TCS", time: "3 hours ago", read: true, icon: Truck, color: "text-blue-500" },
  { id: "5", type: "customer", title: "New Customer", message: "Zara Malik registered", time: "5 hours ago", read: true, icon: Users, color: "text-purple-500" },
];

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications] = useState(MOCK_NOTIFICATIONS);
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full bg-white border-r border-neutral-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <span className="font-display text-xl text-charcoal">DASTAN Admin</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${
                sidebarOpen ? "lg:hidden" : "lg:flex"
              }`}
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto px-3">
            <ul className="space-y-1">
              {ADMIN_NAV.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== "/admin" && location.pathname.startsWith(item.href));
                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-charcoal text-white"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-charcoal"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && <span className="font-body text-sm font-medium">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom */}
          <div className="p-3 border-t border-neutral-200">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Sun className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-body text-sm">View Store</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-xl mx-4 lg:mx-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search products, orders, customers..."
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-lg hover:bg-neutral-100"
                >
                  <Bell className="w-5 h-5 text-neutral-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
                        <h3 className="font-body text-sm font-medium text-charcoal">Notifications</h3>
                        {unreadCount > 0 && (
                          <button className="text-xs text-charcoal hover:underline">Mark all read</button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <button
                            key={notif.id}
                            className={`w-full px-4 py-3 hover:bg-neutral-50 transition-colors ${!notif.read ? "bg-blue-50" : ""}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg bg-neutral-100 ${notif.color}`}>
                                <notif.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-body text-sm font-medium text-charcoal">{notif.title}</p>
                                <p className="font-body text-xs text-neutral-500 truncate">{notif.message}</p>
                                <p className="font-body text-xs text-neutral-400 mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 bg-charcoal rounded-full mt-2" />}
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-neutral-200">
                        <Link to="/admin/notifications" className="block text-center text-sm text-charcoal hover:underline">View all notifications</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-neutral-50 rounded-lg">
                <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="font-body text-sm font-medium text-charcoal">Admin</span>
              </div>

              <button className="sm:hidden p-2 rounded-lg hover:bg-neutral-100">
                <Sun className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}