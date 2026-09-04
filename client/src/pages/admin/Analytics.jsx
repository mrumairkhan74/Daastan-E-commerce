"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingCart, DollarSign, Clock, MapPin, Activity, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";

const ANALYTICS_DATA = {
  traffic: { total: 45230, change: "+12.5%", trend: "up", today: 1234, realtime: 42, sources: [
    { source: "Direct", visits: 18500, percentage: 41 },
    { source: "Organic Search", visits: 12400, percentage: 27 },
    { source: "Social Media", visits: 8900, percentage: 20 },
    { source: "Referral", visits: 3400, percentage: 8 },
    { source: "Email", visits: 2030, percentage: 4 },
  ]},
  conversion: { rate: 3.2, change: "+0.4%", trend: "up", funnel: [
    { stage: "Visitors", count: 45230 },
    { stage: "Product Views", count: 12450 },
    { stage: "Add to Cart", count: 3200 },
    { stage: "Checkout", count: 1850 },
    { stage: "Purchases", count: 1445 },
  ]},
  revenue: { total: 2845000, change: "+18%", trend: "up", byCategory: [
    { category: "Shirts", revenue: 1850000, orders: 1234 },
    { category: "Jewelry", revenue: 995000, orders: 672 },
  ], byChannel: [
    { channel: "Direct", revenue: 1150000 },
    { channel: "Organic", revenue: 850000 },
    { channel: "Social", revenue: 520000 },
    { channel: "Email", revenue: 325000 },
  ]},
  customers: { total: 1234, new: 89, returning: 34, change: "+15%", trend: "up", topLocations: [
    { city: "Lahore", customers: 342, revenue: 780000 },
    { city: "Karachi", customers: 298, revenue: 680000 },
    { city: "Islamabad", customers: 187, revenue: 420000 },
    { city: "Rawalpindi", customers: 145, revenue: 320000 },
    { city: "Faisalabad", customers: 98, revenue: 210000 },
  ]},
};

const METRICS = [
  { label: "Today's Visitors", value: "1,234", change: "+18%", trend: "up", icon: Users, color: "bg-blue-500", realtime: 42 },
  { label: "Conversion Rate", value: "3.2%", change: "+0.4%", trend: "up", icon: TrendingUp, color: "bg-green-500" },
  { label: "Total Orders", value: "1,445", change: "+8%", trend: "up", icon: ShoppingCart, color: "bg-purple-500" },
  { label: "Avg Order Value", value: "PKR 1,969", change: "-2%", trend: "down", icon: DollarSign, color: "bg-amber-500" },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Analytics</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Store performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
      </motion.div>

      {/* Real-time indicator */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-body text-sm font-medium text-green-700">Live: 42 active users</span>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Today: 1,234 visitors</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">This week: 8,542</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">This month: 32,100</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Activity className="w-4 h-4" />
          <span>Page views: 3,456 today</span>
          <span className="mx-2">|</span>
          <span>Bounce rate: 42%</span>
          <span className="mx-2">|</span>
          <span>Avg session: 4m 32s</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white rounded-xl p-6 border border-neutral-200 relative">
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>{metric.realtime} live</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${metric.color}`}><metric.icon className="w-6 h-6 text-white" /></div>
              <div className={`flex items-center gap-1 text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>{metric.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />} <span>{metric.change}</span></div>
            </div>
            <div className="mt-4"><p className="font-display text-3xl text-charcoal">{metric.value}</p><p className="font-body text-sm text-neutral-500 mt-1">{metric.label}</p></div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="font-display text-lg text-charcoal mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {ANALYTICS_DATA.traffic.sources.map((s) => (
              <div key={s.source} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-neutral-600">{s.source}</div>
                <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-charcoal rounded-full transition-all" style={{ width: `${s.percentage}%` }}></div>
                </div>
                <div className="w-20 text-sm font-medium text-charcoal text-right">{s.visits.toLocaleString()}</div>
                <div className="w-16 text-sm text-neutral-500 text-right">{s.percentage}%</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="font-display text-lg text-charcoal mb-6">Conversion Funnel</h2>
          <div className="space-y-3">
            {ANALYTICS_DATA.conversion.funnel.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-neutral-600">{f.stage}</div>
                <div className="flex-1 h-6 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-charcoal rounded-full transition-all" style={{ width: `${(f.count / ANALYTICS_DATA.conversion.funnel[0].count) * 100}%` }}></div>
                </div>
                <div className="w-20 text-sm font-medium text-charcoal text-right">{f.count.toLocaleString()}</div>
                <div className="w-16 text-sm text-neutral-500 text-right">{((f.count / ANALYTICS_DATA.conversion.funnel[0].count) * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="font-display text-lg text-charcoal mb-6">Revenue by Category</h2>
          <div className="space-y-4">
            {ANALYTICS_DATA.revenue.byCategory.map((c) => (
              <div key={c.category} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-neutral-600">{c.category}</div>
                <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(c.revenue / ANALYTICS_DATA.revenue.total) * 100}%` }}></div>
                </div>
                <div className="w-28 text-sm font-medium text-charcoal text-right">PKR {(c.revenue / 100000).toFixed(1)}L</div>
                <div className="w-20 text-sm text-neutral-500 text-right">{c.orders} orders</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-xl p-6 border border-neutral-200">
          <h2 className="font-display text-lg text-charcoal mb-6">Top Locations</h2>
          <div className="space-y-4">
            {ANALYTICS_DATA.customers.topLocations.map((loc, i) => (
              <div key={loc.city} className="flex items-center gap-4">
                <span className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-white font-display text-sm">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-charcoal">{loc.city}</p>
                  <p className="font-body text-xs text-neutral-500">{loc.customers} customers</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm font-medium text-charcoal">PKR {(loc.revenue / 100000).toFixed(1)}L</p>
                  <p className="font-body text-xs text-neutral-500">{((loc.revenue / ANALYTICS_DATA.revenue.total) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
          <Clock className="w-10 h-10 mx-auto mb-3 text-blue-500" />
          <p className="font-display text-3xl text-charcoal">4m 32s</p>
          <p className="font-body text-sm text-neutral-500 mt-1">Avg Session Duration</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
          <Users className="w-10 h-10 mx-auto mb-3 text-green-500" />
          <p className="font-display text-3xl text-charcoal">2.8</p>
          <p className="font-body text-sm text-neutral-500 mt-1">Pages per Session</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
          <TrendingUp className="w-10 h-10 mx-auto mb-3 text-purple-500" />
          <p className="font-display text-3xl text-charcoal">42%</p>
          <p className="font-body text-sm text-neutral-500 mt-1">Returning Visitor Rate</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
          <MapPin className="w-10 h-10 mx-auto mb-3 text-amber-500" />
          <p className="font-display text-3xl text-charcoal">12</p>
          <p className="font-body text-sm text-neutral-500 mt-1">Countries Reached</p>
        </div>
      </motion.div>
    </div>
  );
}