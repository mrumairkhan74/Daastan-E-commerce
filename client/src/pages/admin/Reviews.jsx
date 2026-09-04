"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: "REV-001",
    product: "DASTAN — CHAPTER I",
    productId: "1",
    customer: "Ahmed Khan",
    email: "ahmed@example.com",
    rating: 5,
    title: "Perfect fit and quality",
    text: "The fabric is amazing, so soft and comfortable. The oversized fit is exactly as described. Love the Urdu calligraphy on the back!",
    status: "approved",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: "REV-002",
    product: "DASTAN — CHAPTER III",
    productId: "3",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    rating: 4,
    title: "Great design, runs slightly large",
    text: "Beautiful shirt, the grey color is perfect for everyday wear. Size runs slightly large as expected for oversized fit.",
    status: "approved",
    date: "2024-01-14",
    verified: true,
  },
  {
    id: "REV-003",
    product: "NAQSH RING",
    productId: "6",
    customer: "Ali Hassan",
    email: "ali@example.com",
    rating: 5,
    title: "Stunning ring",
    text: "The Urdu engraving is beautiful. Adjustable band fits perfectly. Great quality for the price.",
    status: "pending",
    date: "2024-01-13",
    verified: true,
  },
  {
    id: "REV-004",
    product: "DASTAN — CHAPTER II",
    productId: "2",
    customer: "Fatima Ali",
    email: "fatima@example.com",
    rating: 3,
    title: "Good but shipping was slow",
    text: "Shirt is nice quality but took 10 days to arrive. The black color is deep and rich.",
    status: "approved",
    date: "2024-01-12",
    verified: false,
  },
  {
    id: "REV-005",
    product: "MAAH CHAIN",
    productId: "7",
    customer: "Omar Farooq",
    email: "omar@example.com",
    rating: 2,
    title: "Chain broke after 2 days",
    text: "Disappointed. The chain snapped after just 2 days of wear. Customer service hasn't responded yet.",
    status: "rejected",
    date: "2024-01-11",
    verified: true,
  },
  {
    id: "REV-006",
    product: "ADAA PEARL",
    productId: "8",
    customer: "Zara Malik",
    email: "zara@example.com",
    rating: 5,
    title: "Absolutely gorgeous",
    text: "The pearl earrings are stunning. Perfect for special occasions. Packaging was beautiful too.",
    status: "pending",
    date: "2024-01-10",
    verified: true,
  },
];

const STATUS_CONFIG = {
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: AlertCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
};

const STATUS_OPTIONS = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const renderStatusIcon = (status) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;
  return <Icon className={`w-5 h-5 ${config.color.replace("bg-", "text-").replace("100", "600")}`} />;
};

const renderStars = (rating, interactive = false, onSelect = () => {}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => interactive && onSelect(star)}
        className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
        disabled={!interactive}
      >
        <Star className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}`} />
      </button>
    ))}
  </div>
);

export default function AdminReviews() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [newReviewStatus, setNewReviewStatus] = useState("pending");

  const filteredReviews = MOCK_REVIEWS.filter((r) => {
    const matchesSearch = r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.text.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesRating = ratingFilter === "all" || r.rating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "rating") return (b.rating - a.rating) * dir;
    if (sortBy === "product") return a.product.localeCompare(b.product) * dir;
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir(field === "date" ? "desc" : "asc"); }
  };

  const openDetailModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setNewReviewStatus(review.status);
    setShowModal(true);
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Review ${editingReview.id} status changed to ${newStatus}`);
    setShowModal(false);
  };

  const deleteReview = (reviewId) => {
    if (window.confirm("Delete this review permanently?")) {
      console.log(`Review ${reviewId} deleted`);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Reviews</h1>
          <p className="font-body text-sm text-neutral-500 mt-1">Manage customer reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
            {MOCK_REVIEWS.filter(r => r.status === "pending").length} Pending
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
            {MOCK_REVIEWS.filter(r => r.status === "rejected").length} Rejected
          </span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Search reviews, products, customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-charcoal">
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("product")}>
                  Product {sortBy === "product" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("customer")}>
                  Customer {sortBy === "customer" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("rating")}>
                  Rating {sortBy === "rating" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left font-body text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:text-charcoal" onClick={() => handleSort("date")}>
                  Date {sortBy === "date" && (sortDir === "asc" ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
                </th>
                <th className="px-6 py-3 text-right font-body text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredReviews.map((review, i) => (
                <motion.tr key={review.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body text-sm font-medium text-charcoal">{review.product}</p>
                      <p className="font-body text-xs text-neutral-500">{review.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-body text-sm font-medium text-charcoal">{review.customer}</p>
                      <p className="font-body text-xs text-neutral-500">{review.email}</p>
                      {review.verified && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">Verified Purchase</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="font-body text-sm font-medium text-charcoal">{review.rating}.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-body text-sm font-medium text-charcoal">{review.title}</p>
                    <p className="font-body text-xs text-neutral-500 line-clamp-2">{review.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_CONFIG[review.status].color}`}>
                      {STATUS_CONFIG[review.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-neutral-500">{review.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openDetailModal(review)} className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEditModal(review)} className="p-2 text-neutral-500 hover:text-charcoal hover:bg-neutral-100 rounded-lg transition-colors" title="Moderate">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="font-body text-sm text-neutral-500">Showing {filteredReviews.length} of {MOCK_REVIEWS.length} reviews</p>
        </div>
      </motion.div>

      {/* Detail/Edit Modal */}
      <AnimatePresence>
        {(selectedReview || editingReview) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => { setSelectedReview(null); setEditingReview(null); }}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="font-display text-xl text-charcoal">{editingReview ? "Moderate Review" : "Review Details"}</h2>
                <button onClick={() => { setSelectedReview(null); setEditingReview(null); }} className="p-2 hover:bg-neutral-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-6">
                {editingReview ? (
                  <form className="space-y-6">
                    <div>
                      <label className="block font-body text-sm text-neutral-700 mb-2">Status</label>
                      <div className="space-y-2">
                        {STATUS_OPTIONS.map((status) => (
                          <label key={status.value} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${newReviewStatus === status.value ? "border-charcoal bg-charcoal/5" : "border-neutral-200 hover:border-charcoal hover:bg-neutral-50"}`}>
                            <input type="radio" name="status" value={status.value} checked={newReviewStatus === status.value} onChange={(e) => setNewReviewStatus(e.target.value)} className="text-charcoal" />
                            <div className="flex items-center gap-2">
                              {renderStatusIcon(status.value)}
                              <span className="font-body text-sm font-medium text-charcoal">{status.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                      <button type="button" onClick={() => { setSelectedReview(null); setEditingReview(null); }} className="px-6 py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Cancel</button>
                      <button type="submit" onClick={() => handleStatusChange(newReviewStatus)} className="px-6 py-2 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Product</h3>
                        <p className="font-body text-sm font-medium text-charcoal">{selectedReview.product}</p>
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Rating</h3>
                        <div className="flex items-center gap-2">{renderStars(selectedReview.rating)} <span className="font-body text-sm font-medium text-charcoal">{selectedReview.rating}.0</span></div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Review Title</h3>
                        <p className="font-body text-sm text-charcoal">{selectedReview.title}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Review Text</h3>
                        <p className="font-body text-sm text-neutral-600 whitespace-pre-wrap">{selectedReview.text}</p>
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Customer</h3>
                        <dl className="space-y-1 font-body text-sm">
                          <div className="flex justify-between"><dt className="text-neutral-500">Name</dt><dd className="font-medium">{selectedReview.customer}</dd></div>
                          <div className="flex justify-between"><dt className="text-neutral-500">Email</dt><dd>{selectedReview.email}</dd></div>
                          <div className="flex justify-between"><dt className="text-neutral-500">Verified</dt><dd>{selectedReview.verified ? "Yes" : "No"}</dd></div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Status</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_CONFIG[selectedReview.status].color}`}>{STATUS_CONFIG[selectedReview.status].label}</span>
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">Date</h3>
                        <p className="font-body text-sm text-neutral-600">{selectedReview.date}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                      <button onClick={() => { setSelectedReview(null); setEditingReview(null); }} className="px-6 py-2 border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Close</button>
                      <button onClick={() => { openEditModal(selectedReview); setEditingReview(selectedReview); setNewReviewStatus(selectedReview.status); setSelectedReview(null); }} className="px-6 py-2 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90">Moderate</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}