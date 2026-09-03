"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Mail, Phone, MapPin, MoreVertical, ChevronDown, ChevronUp, Edit } from "lucide-react";

const MOCK_CUSTOMERS = [
  { id: "CUST-001", name: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1234567", orders: 12, totalSpent: 18500, status: "Active", joined: "2023-06-15", lastOrder: "2024-01-10" },
  { id: "CUST-002", name: "Sara Ahmed", email: "sara@example.com", phone: "+92 301 2345678", orders: 8, totalSpent: 12400, status: "Active", joined: "2023-08-22", lastOrder: "2024-01-08" },
  { id: "CUST-003", name: "Ali Hassan", email: "ali@example.com", phone: "+92 302 3456789", orders: 5, totalSpent: 7800, status: "Active", joined: "2023-11-10", lastOrder: "2024-01-05" },
  { id: "CUST-004", name: "Fatima Ali", email: "fatima@example.com", phone: "+92 303 4567890", orders: 3, totalSpent: 4200, status: "New", joined: "2024-01-01", lastOrder: "2024-01-12" },
  { id: "CUST-005", name: "Omar Farooq", email: "omar@example.com", phone: "+92 304 5678901", orders: 15, totalSpent: 24800, status: "VIP", joined: "2023-04-30", lastOrder: "2024-01-09" },
  { id: "CUST-006", name: "Zara Malik", email: "zara@example.com", phone: "+92 305 6789012", orders: 7, totalSpent: 9600, status: "Active", joined: "2023-09-18", lastOrder: "2024-01-06" },
  { id: "CUST-007", name: "Hassan Raza", email: "hassan@example.com", phone: "+92 306 7890123", orders: 2, totalSpent: 3200, status: "New", joined: "2023-12-20", lastOrder: "2024-01-03" },
  { id: "CUST-008", name: "Ayesha Noor", email: "ayesha@example.com", phone: "+92 307 8901234", orders: 4, totalSpent: 5800, status: "Inactive", joined: "2023-10-05", lastOrder: "2023-12-25" },
];

const STATUS_BADGES = {
  VIP: "bg-purple-100 text-purple-700",
  Active: "bg-green-100 text-green-700",
  New: "bg-blue-100 text-blue-700",
  Inactive: "bg-neutral-100 text-neutral-700",
};

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("totalSpent");
  const [sortDir, setSortDir] = useState("desc");

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "orders") return (b.orders - a.orders) * dir;
    if (sortBy === "totalSpent") return (b.totalSpent - a.totalSpent) * dir;
    if (sortBy === "joined") return new Date(b.joined) - new Date(a.joined);
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir(field === "name" ? "asc" : "desc"); }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Customers</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Manage customer accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">{MOCK_CUSTOMERS.filter(c => c.status === "Active" || c.status === "VIP").length} Active</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">{MOCK_CUSTOMERS.filter(c => c.status === "VIP").length} VIP</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input type="search" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
          <option value="all">All Status</option>
          <option value="VIP">VIP</option>
          <option value="Active">Active</option>
          <option value="New">New</option>
          <option value="Inactive">Inactive</option>
        </select>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("name")}>
                  Customer {sortBy === "name" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("orders")}>
                  Orders {sortBy === "orders" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("totalSpent")}>
                  Total Spent {sortBy === "totalSpent" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-right font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredCustomers.map((customer, i) => (
                <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center text-white font-display text-sm">{customer.name.charAt(0)}</div>
                      <div>
                        <p className="font-body text-sm font-medium text-charcoal">{customer.name}</p>
                        <p className="font-body text-xs text-neutral-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 font-body text-sm text-neutral-600">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{customer.email}</div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-600">{customer.orders}</td>
                  <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">PKR {customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_BADGES[customer.status]}`}>{customer.status}</span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-500">{customer.joined}</td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="View Details"><Edit className="w-4 h-4" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="font-body text-sm text-neutral-500">Showing {filteredCustomers.length} of {MOCK_CUSTOMERS.length} customers</p>
        </div>
      </motion.div>
    </div>
  );
}