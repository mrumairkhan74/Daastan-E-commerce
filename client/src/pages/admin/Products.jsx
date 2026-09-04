"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
  RotateCcw,
  Trash,
  AlertTriangle,
} from "lucide-react";

const MOCK_PRODUCTS = [
  { id: "1", name: "DASTAN — CHAPTER I", category: "Shirts", price: 1499, stock: 45, status: "Active", image: "/images/shirts/chapter-1-front.jpg" },
  { id: "2", name: "DASTAN — CHAPTER II", category: "Shirts", price: 1499, stock: 38, status: "Active", image: "/images/shirts/chapter-2-front.jpg" },
  { id: "3", name: "DASTAN — CHAPTER III", category: "Shirts", price: 1499, stock: 52, status: "Active", image: "/images/shirts/chapter-3-front.jpg" },
  { id: "4", name: "DASTAN — CHAPTER IV", category: "Shirts", price: 1499, stock: 29, status: "Low Stock", image: "/images/shirts/chapter-4-front.jpg" },
  { id: "5", name: "DASTAN — CHAPTER V", category: "Shirts", price: 1499, stock: 0, status: "Out of Stock", image: "/images/shirts/chapter-5-front.jpg" },
  { id: "6", name: "NAQSH RING", category: "Jewelry", price: 1299, stock: 24, status: "Active", image: "/images/jewelry/naqsh-ring.jpg" },
  { id: "7", name: "MAAH CHAIN", category: "Jewelry", price: 1499, stock: 18, status: "Active", image: "/images/jewelry/maah-chain.jpg" },
  { id: "8", name: "ADAA PEARL", category: "Jewelry", price: 1699, stock: 15, status: "Active", image: "/images/jewelry/adaa-pearl.jpg" },
];

const DELETED_PRODUCTS = [
  { id: "9", name: "DASTAN — CHAPTER VI (Deleted)", category: "Shirts", price: 1499, stock: 0, status: "Deleted", deletedAt: "2024-01-10", image: "/images/shirts/chapter-6-front.jpg" },
  { id: "10", name: "OLD JEWELRY (Deleted)", category: "Jewelry", price: 999, stock: 0, status: "Deleted", deletedAt: "2024-01-05", image: "/images/jewelry/old-item.jpg" },
];

const STATUS_BADGES = {
  Active: "bg-green-100 text-green-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
  Draft: "bg-neutral-100 text-neutral-700",
  Deleted: "bg-red-100 text-red-700",
};

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState("active"); // 'active' or 'trash'
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [deletedProducts, setDeletedProducts] = useState(DELETED_PRODUCTS);

  const currentProducts = viewMode === "active" ? products : deletedProducts;

  const filteredProducts = currentProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "price") return (a.price - b.price) * dir;
    if (sortBy === "stock") return (a.stock - b.stock) * dir;
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const softDeleteProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product && window.confirm(`Move "${product.name}" to trash?`)) {
      const deletedProduct = { ...product, status: "Deleted", deletedAt: new Date().toISOString().split('T')[0] };
      setProducts(products.filter(p => p.id !== productId));
      setDeletedProducts([deletedProduct, ...deletedProducts]);
    }
  };

  const restoreProduct = (productId) => {
    const product = deletedProducts.find(p => p.id === productId);
    if (product && window.confirm(`Restore "${product.name}"?`)) {
      const restoredProduct = { ...product, status: "Active", deletedAt: null };
      setDeletedProducts(deletedProducts.filter(p => p.id !== productId));
      setProducts([restoredProduct, ...products]);
    }
  };

  const permanentDelete = (productId) => {
    const product = deletedProducts.find(p => p.id === productId);
    if (product && window.confirm(`PERMANENTLY delete "${product.name}"? This cannot be undone.`)) {
      setDeletedProducts(deletedProducts.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Products</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("active")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === "active" ? "bg-white text-charcoal shadow-sm" : "text-neutral-500 hover:text-charcoal"
              }`}
            >
              Active <span className="ml-1 px-2 py-0.5 text-xs bg-charcoal text-white rounded-full">{filteredProducts.length}</span>
            </button>
            <button
              onClick={() => setViewMode("trash")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === "trash" ? "bg-white text-charcoal shadow-sm" : "text-neutral-500 hover:text-charcoal"
              }`}
            >
              Trash <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{deletedProducts.length}</span>
            </button>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white font-body text-sm rounded-lg hover:bg-charcoal/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal"
          >
            <option value="all">All Categories</option>
            <option value="Shirts">Shirts</option>
            <option value="Jewelry">Jewelry</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Product
                </th>
                <th
                  className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Category
                    {sortBy === "name" ? (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : null}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center gap-1">
                    Price
                    {sortBy === "price" ? (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : null}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center gap-1">
                    Stock
                    {sortBy === "stock" ? (sortDir === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : null}
                  </div>
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product, i) => (
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-body text-sm font-medium text-charcoal">{product.name}</p>
                        <p className="font-body text-xs text-neutral-500">SKU: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-600">{product.category}</td>
                  <td className="px-6 py-4 font-body text-sm font-medium text-charcoal">PKR {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-600">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_BADGES[product.status]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      {viewMode === "active" ? (
                        <>
                          <button onClick={() => openEditModal(product)} className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => softDeleteProduct(product.id)} className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Move to Trash">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => restoreProduct(product.id)} className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors" title="Restore">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button onClick={() => permanentDelete(product.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" title="Delete Permanently">
                            <Trash className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="font-body text-sm text-neutral-500">Showing {filteredProducts.length} of {MOCK_PRODUCTS.length} products</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100 disabled:opacity-50">Previous</button>
            <button className="w-8 h-8 bg-charcoal text-white text-sm rounded-lg">1</button>
            <button className="w-8 h-8 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">2</button>
            <button className="w-8 h-8 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">3</button>
            <button className="px-3 py-1 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="font-display text-xl text-charcoal">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-body text-sm text-neutral-700 mb-2">Product Name *</label>
                    <input type="text" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" placeholder="DASTAN — CHAPTER I" defaultValue={editingProduct?.name || ""} required />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-neutral-700 mb-2">Category *</label>
                    <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" defaultValue={editingProduct?.category || "Shirts"}>
                      <option value="Shirts">Shirts</option>
                      <option value="Jewelry">Jewelry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm text-neutral-700 mb-2">Price (PKR) *</label>
                    <input type="number" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" placeholder="1499" defaultValue={editingProduct?.price || ""} required />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-neutral-700 mb-2">Stock *</label>
                    <input type="number" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal" placeholder="50" defaultValue={editingProduct?.stock || ""} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-body text-sm text-neutral-700 mb-2">Description</label>
                    <textarea rows={4} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-charcoal resize-none" placeholder="Product description..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-body text-sm text-neutral-700 mb-2">Images</label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                      <p className="font-body text-sm text-neutral-500">Drag & drop images here, or click to browse</p>
                      <p className="font-body text-xs text-neutral-400 mt-1">Max 5 images, 5MB each</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90">
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}