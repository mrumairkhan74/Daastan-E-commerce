"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const STATS = [
  {
    label: "Total Products",
    value: "147",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    label: "Total Orders",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    label: "Customers",
    value: "892",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    label: "Revenue",
    value: "PKR 2.4M",
    change: "-3%",
    trend: "down",
    icon: DollarSign,
    color: "bg-amber-500",
  },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "Ahmed Khan", items: 3, total: "PKR 4,497", status: "Delivered", date: "2024-01-15" },
  { id: "ORD-002", customer: "Sara Ahmed", items: 1, total: "PKR 1,499", status: "Shipped", date: "2024-01-14" },
  { id: "ORD-003", customer: "Ali Hassan", items: 2, total: "PKR 2,798", status: "Processing", date: "2024-01-13" },
  { id: "ORD-004", customer: "Fatima Ali", items: 1, total: "PKR 1,299", status: "Pending", date: "2024-01-12" },
  { id: "ORD-005", customer: "Omar Farooq", items: 4, total: "PKR 5,996", status: "Delivered", date: "2024-01-11" },
];

const TOP_PRODUCTS = [
  { name: "DASTAN — CHAPTER I", sold: 234, revenue: "PKR 350,866" },
  { name: "DASTAN — CHAPTER III", sold: 189, revenue: "PKR 283,311" },
  { name: "NAQSH RING", sold: 156, revenue: "PKR 202,644" },
  { name: "DASTAN — CHAPTER II", sold: 145, revenue: "PKR 217,355" },
  { name: "MAAH CHAIN", sold: 132, revenue: "PKR 197,868" },
];

const STATUS_COLORS = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-neutral-100 text-neutral-700",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Overview of your store performance</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Live</span>
          <span>Last updated: Just now</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-white rounded-xl p-6 border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-display text-3xl text-charcoal">{stat.value}</p>
              <p className="font-body text-sm text-neutral-500 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg text-charcoal">Revenue Overview</h2>
            <select className="px-3 py-1 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-charcoal">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-around">
            {[12, 19, 15, 25, 22, 30, 28].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 bg-charcoal rounded-t transition-all hover:bg-charcoal/80"
                  style={{ height: `${height}%` }}
                />
                <span className="font-body text-xs text-neutral-500">Mon</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl p-6 border border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg text-charcoal">Orders Overview</h2>
            <select className="px-3 py-1 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-charcoal">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-around">
            {[8, 12, 10, 15, 13, 18, 16].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 bg-green-500 rounded-t transition-all hover:bg-green-500/80"
                  style={{ height: `${height * 5}%` }}
                />
                <span className="font-body text-xs text-neutral-500">Mon</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-display text-lg text-charcoal">Recent Orders</h2>
            <Link to="/admin/orders" className="font-body text-sm text-charcoal hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">{order.id}</td>
                    <td className="px-6 py-4 font-body text-sm text-neutral-600">{order.customer}</td>
                    <td className="px-6 py-4 font-body text-sm text-neutral-600">{order.items}</td>
                    <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-neutral-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-display text-lg text-charcoal">Top Selling Products</h2>
            <Link to="/admin/products" className="font-body text-sm text-charcoal hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-neutral-200">
            {TOP_PRODUCTS.map((product, i) => (
              <div key={product.name} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center font-display text-sm text-charcoal">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-body text-sm font-medium text-charcoal">{product.name}</p>
                    <p className="font-body text-xs text-neutral-500">{product.sold} sold</p>
                  </div>
                </div>
                <p className="font-body text-sm font-medium text-charcoal">{product.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}