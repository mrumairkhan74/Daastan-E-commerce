"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MOCK_ORDERS = [
  { id: "ORD-2024-001", customer: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1234567", items: 3, total: 4497, status: "Delivered", payment: "Paid", date: "2024-01-15", address: "123 Main St, Lahore" },
  { id: "ORD-2024-002", customer: "Sara Ahmed", email: "sara@example.com", phone: "+92 301 2345678", items: 1, total: 1499, status: "Shipped", payment: "Paid", date: "2024-01-14", address: "456 Oak Ave, Karachi" },
  { id: "ORD-2024-003", customer: "Ali Hassan", email: "ali@example.com", phone: "+92 302 3456789", items: 2, total: 2798, status: "Processing", payment: "Paid", date: "2024-01-13", address: "789 Pine Rd, Islamabad" },
  { id: "ORD-2024-004", customer: "Fatima Ali", email: "fatima@example.com", phone: "+92 303 4567890", items: 1, total: 1299, status: "Pending", payment: "COD", date: "2024-01-12", address: "321 Elm St, Rawalpindi" },
  { id: "ORD-2024-005", customer: "Omar Farooq", email: "omar@example.com", phone: "+92 304 5678901", items: 4, total: 5996, status: "Delivered", payment: "Paid", date: "2024-01-11", address: "654 Maple Dr, Faisalabad" },
  { id: "ORD-2024-006", customer: "Zara Malik", email: "zara@example.com", phone: "+92 305 6789012", items: 2, total: 2998, status: "Shipped", payment: "Paid", date: "2024-01-10", address: "987 Cedar Ln, Multan" },
  { id: "ORD-2024-007", customer: "Hassan Raza", email: "hassan@example.com", phone: "+92 306 7890123", items: 1, total: 1699, status: "Processing", payment: "COD", date: "2024-01-09", address: "147 Birch Blvd, Peshawar" },
  { id: "ORD-2024-008", customer: "Ayesha Noor", email: "ayesha@example.com", phone: "+92 307 8901234", items: 3, total: 4197, status: "Cancelled", payment: "Refunded", date: "2024-01-08", address: "258 Spruce Way, Quetta" },
];

const STATUS_CONFIG = {
  Pending: { label: "Pending", color: "bg-neutral-100 text-neutral-700", icon: Clock },
  Processing: { label: "Processing", color: "bg-blue-100 text-blue-700", icon: Truck },
  Shipped: { label: "Shipped", color: "bg-amber-100 text-amber-700", icon: Truck },
  Delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle },
  Cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
};

const PAYMENT_BADGES = {
  Paid: "bg-green-100 text-green-700",
  COD: "bg-amber-100 text-amber-700",
  Refunded: "bg-red-100 text-red-700",
  Pending: "bg-neutral-100 text-neutral-700",
};

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

const renderStatusIcon = (status) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;
  return <Icon className={`w-5 h-5 ${config.color.replace("bg-", "text-").replace("100", "600")}`} />;
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusOrder, setStatusOrder] = useState(null);

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || o.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "total") return (b.total - a.total) * dir;
    if (sortBy === "customer") return a.customer.localeCompare(b.customer) * dir;
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir(field === "date" ? "desc" : "asc"); }
  };

  const openStatusModal = (order) => {
    setStatusOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusChange = (newStatus) => {
    // In real app: API call
    console.log(`Order ${statusOrder.id} status changed to ${newStatus}`);
    setShowStatusModal(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Orders</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Manage customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            {MOCK_ORDERS.filter(o => o.status !== "Cancelled" && o.status !== "Delivered").length} Pending
          </span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Search orders, customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
            <option value="all">All Payment</option>
            <option value="Paid">Paid</option>
            <option value="COD">Cash on Delivery</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("id")}>
                  Order ID {sortBy === "id" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("customer")}>
                  Customer {sortBy === "customer" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("total")}>
                  Total {sortBy === "total" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("date")}>
                  Date {sortBy === "date" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-right font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredOrders.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body text-sm font-medium text-charcoal">{order.customer}</p>
                      <p className="font-body text-xs text-neutral-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-600">{order.items} items</td>
                  <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">PKR {order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_CONFIG[order.status].color}`}>
                      {STATUS_CONFIG[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${PAYMENT_BADGES[order.payment]}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openStatusModal(order)} className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="Update Status">
                        <Truck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="font-body text-sm text-neutral-500">Showing {filteredOrders.length} of {MOCK_ORDERS.length} orders</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">Previous</button>
            <button className="w-8 h-8 bg-charcoal text-white text-sm rounded-lg">1</button>
            <button className="w-8 h-8 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">2</button>
            <button className="px-3 py-1 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedOrder(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="font-display text-xl text-charcoal">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-neutral-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Order Info</h3>
                    <dl className="space-y-2 font-body text-sm">
                      <div className="flex justify-between"><dt className="text-neutral-500">Order ID</dt><dd className="font-medium">{selectedOrder.id}</dd></div>
                      <div className="flex justify-between"><dt className="text-neutral-500">Date</dt><dd>{selectedOrder.date}</dd></div>
                      <div className="flex justify-between"><dt className="text-neutral-500">Status</dt><dd><span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_CONFIG[selectedOrder.status].color}`}>{selectedOrder.status}</span></dd></div>
                      <div className="flex justify-between"><dt className="text-neutral-500">Payment</dt><dd><span className={`px-2 py-1 text-xs font-medium rounded-full ${PAYMENT_BADGES[selectedOrder.payment]}`}>{selectedOrder.payment}</span></dd></div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Customer</h3>
                    <dl className="space-y-2 font-body text-sm">
                      <div><dt className="text-neutral-500">Name</dt><dd className="font-medium">{selectedOrder.customer}</dd></div>
                      <div><dt className="text-neutral-500">Email</dt><dd>{selectedOrder.email}</dd></div>
                      <div><dt className="text-neutral-500">Phone</dt><dd>{selectedOrder.phone}</dd></div>
                    </dl>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Shipping Address</h3>
                    <p className="font-body text-sm text-neutral-600">{selectedOrder.address}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Order Items</h3>
                    <div className="border border-neutral-200 rounded-lg overflow-hidden">
                      <div className="p-3 bg-neutral-50 border-b border-neutral-200 font-body text-xs font-medium text-neutral-500 uppercase tracking-wider grid grid-cols-4 gap-4">
                        <span>Product</span><span>Qty</span><span>Price</span><span>Total</span>
                      </div>
                      <div className="p-4">
                        <p className="font-body text-sm text-neutral-500">Order items would be listed here</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Totals</h3>
                    <dl className="space-y-2 font-body text-sm">
                      <div className="flex justify-between"><dt className="text-neutral-500">Subtotal</dt><dd>PKR {selectedOrder.total.toLocaleString()}</dd></div>
                      <div className="flex justify-between"><dt className="text-neutral-500">Shipping</dt><dd>Free</dd></div>
                      <div className="flex justify-between border-t border-neutral-200 pt-2"><dt className="font-medium text-charcoal">Total</dt><dd className="font-medium text-charcoal">PKR {selectedOrder.total.toLocaleString()}</dd></div>
                    </dl>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                  <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && statusOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowStatusModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="font-display text-xl text-charcoal">Update Order Status</h2>
                <button onClick={() => setShowStatusModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <p className="font-body text-sm text-neutral-600">Update status for <span className="font-medium">{statusOrder.id}</span></p>
                <div className="space-y-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value)}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${statusOrder.status === status.value ? "border-charcoal bg-charcoal/5" : "border-neutral-200 hover:border-charcoal hover:bg-neutral-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        {renderStatusIcon(status.value)}
                        <span className="font-body text-sm font-medium text-charcoal">{status.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowStatusModal(false)} className="w-full py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50 mt-2">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}