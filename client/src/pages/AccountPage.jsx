"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Package,
  MapPin,
  ChevronRight,
  LogOut,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const MOCK_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 4497,
    items: [
      { name: "DASTAN — CHAPTER I", size: "M", quantity: 1, price: 1499 },
      { name: "NAQSH RING", quantity: 2, price: 1299 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-20",
    status: "Shipped",
    total: 1499,
    items: [{ name: "DASTAN — CHAPTER III", size: "L", quantity: 1, price: 1499 }],
  },
];

const MOCK_ADDRESSES = [
  {
    id: "1",
    name: "Home",
    address: "123 Main Street, Block 5",
    city: "Lahore",
    postalCode: "54000",
    country: "Pakistan",
    phone: "+92 300 1234567",
    isDefault: true,
  },
];

export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [newAddress, setNewAddress] = useState(false);

  const handleLogout = () => {
    logout();
    showToast("You've been signed out", "success");
    navigate("/");
  };

  const handleProfileSave = () => {
    updateProfile(profileForm);
    setEditing(false);
    showToast("Profile updated successfully", "success");
  };

  const addAddress = (address) => {
    const addr = { ...address, id: Date.now().toString(), isDefault: addresses.length === 0 };
    setAddresses([...addresses, addr]);
    setNewAddress(false);
    showToast("Address added", "success");
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast("Default address updated", "success");
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display mb-4">My Account</h1>
        <p className="text-neutral-500 mb-6">Please sign in to view your account</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-charcoal text-white font-medium hover:bg-charcoal/90"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-neutral-100 text-charcoal font-medium"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white"
          >
            {activeTab === "profile" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display">Profile Information</h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-1 text-sm text-charcoal/70 hover:text-charcoal"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleProfileSave}
                        className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-1">Full Name</label>
                    {editing ? (
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full max-w-md px-4 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
                      />
                    ) : (
                      <p className="text-lg">{user.name || "Not set"}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-1">Email</label>
                    {editing ? (
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full max-w-md px-4 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
                      />
                    ) : (
                      <p className="text-lg">{user.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-1">Phone</label>
                    {editing ? (
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full max-w-md px-4 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
                        placeholder="+92 3XX XXXXXXX"
                      />
                    ) : (
                      <p className="text-lg text-neutral-400">Not set</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-display mb-6">Order History</h2>
                {MOCK_ORDERS.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No orders yet</p>
                    <Link to="/shop" className="text-charcoal hover:underline mt-2 inline-block">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="border border-neutral-200">
                        <div className="flex items-center justify-between px-4 py-3 bg-neutral-50">
                          <div>
                            <span className="font-medium">{order.id}</span>
                            <span className="text-neutral-400 mx-2">·</span>
                            <span className="text-sm text-neutral-500">{order.date}</span>
                          </div>
                          <span
                            className={`text-sm px-2 py-1 ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.name} {item.size && `(Size: ${item.size})`} × {item.quantity}
                              </span>
                              <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Total</span>
                            <span>Rs. {order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display">Saved Addresses</h2>
                  {!newAddress && (
                    <button
                      onClick={() => setNewAddress(true)}
                      className="text-sm text-charcoal hover:text-charcoal/70"
                    >
                      + Add New Address
                    </button>
                  )}
                </div>

                {newAddress && (
                  <AddressForm
                    onSave={addAddress}
                    onCancel={() => setNewAddress(false)}
                  />
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-neutral-200 p-4 relative">
                      {addr.isDefault && (
                        <span className="absolute top-2 right-2 text-xs bg-charcoal text-white px-2 py-0.5">
                          Default
                        </span>
                      )}
                      <h3 className="font-medium mb-2">{addr.name}</h3>
                      <p className="text-sm text-neutral-600">{addr.address}</p>
                      <p className="text-sm text-neutral-600">
                        {addr.city}, {addr.postalCode}
                      </p>
                      <p className="text-sm text-neutral-600">{addr.country}</p>
                      <p className="text-sm text-neutral-500 mt-2">{addr.phone}</p>
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-sm text-charcoal hover:underline mt-3"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AddressForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-neutral-200 p-4 mb-6 max-w-xl">
      <h3 className="font-medium mb-4">New Address</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Label (e.g., Home, Office)"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Phone"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="px-3 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
        />
        <input
          type="text"
          placeholder="Street Address"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="md:col-span-2 px-3 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
        />
        <input
          type="text"
          placeholder="City"
          required
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="px-3 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
        />
        <input
          type="text"
          placeholder="Postal Code"
          required
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          className="px-3 py-2 border border-neutral-300 focus:border-charcoal focus:outline-none"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-charcoal text-white text-sm hover:bg-charcoal/90"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-neutral-300 text-sm hover:bg-neutral-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
