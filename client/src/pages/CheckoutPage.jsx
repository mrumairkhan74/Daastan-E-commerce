"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { BRAND_CONFIG } from "../data/products";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { success, error } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal > 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setOrderComplete(true);
    clearCart();
    success("Order placed successfully!");
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.selectedSize || 'N/A'}) x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛒 *DASTAN Order*\n\n*Customer Details:*\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city} ${formData.postalCode}\n\n*Order Items:*\n${itemsList}\n\n*Subtotal: PKR ${cartTotal.toLocaleString()}*\n*Shipping: PKR ${shipping}\n*Total: PKR ${total.toLocaleString()}*\n\nPlease confirm my order. Thank you!`
    );

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-charcoal mb-4">Your bag is empty</h1>
          <Link to="/shop" className="text-charcoal/60 hover:text-charcoal underline">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="font-display text-3xl text-charcoal mb-4">Order Placed!</h1>
          <p className="font-body text-charcoal/60 mb-8">
            Thank you for your order! We'll send you a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors"
            >
              Confirm via WhatsApp
            </button>
            <Link
              to="/shop"
              className="block w-full py-4 border border-charcoal text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl text-charcoal mb-8"
      >
        Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress */}
          <div className="flex items-center gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm ${
                  step >= s ? "bg-charcoal text-white" : "bg-warm-beige/20 text-charcoal/40"
                }`}>
                  {s}
                </div>
                <span className={`font-body text-sm ${step >= s ? "text-charcoal" : "text-charcoal/40"}`}>
                  {s === 1 ? "Details" : "Payment"}
                </span>
                {s < 2 && <div className="w-8 h-px bg-warm-beige/30" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                      errors.fullName ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                    }`}
                    placeholder="Ahmedullah"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Phone *</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                      errors.phone ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                    }`}
                    placeholder="03XX-XXXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                    errors.email ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                  }`}
                  placeholder="ahmed@dastan.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Complete Address *</label>
                <input
                  type="text" name="address" value={formData.address} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                    errors.address ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                  }`}
                  placeholder="House #, Street #, Area"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">City *</label>
                  <input
                    type="text" name="city" value={formData.city} onChange={handleInputChange}
                    className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                      errors.city ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                    }`}
                    placeholder="Lahore"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Postal Code *</label>
                  <input
                    type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                    className={`w-full px-4 py-3 border font-body text-sm focus:outline-none ${
                      errors.postalCode ? "border-red-400" : "border-warm-beige/30 focus:border-charcoal"
                    }`}
                    placeholder="54000"
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Order Notes</label>
                <textarea
                  name="notes" value={formData.notes} onChange={handleInputChange} rows={3}
                  className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal resize-none"
                  placeholder="Any special instructions..."
                />
              </div>

              <button
                onClick={() => validateForm() && setStep(2)}
                className="w-full py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
              >
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-warm-beige/10 p-6">
                <h3 className="font-display text-lg mb-2">Cash on Delivery</h3>
                <p className="font-body text-sm text-charcoal/60">
                  Pay when you receive your order. This is our standard payment method for all orders within Pakistan.
                </p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-charcoal/20 text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Place Order"}
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors"
              >
                Order via WhatsApp Instead
              </button>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-warm-beige/5 p-6 space-y-4">
            <h3 className="font-display text-xl">Order Summary</h3>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                  <div className="w-12 h-16 rounded-none shadow-sm" style={{ backgroundColor: item.colorCode }} />
                  <div className="flex-1">
                    <p className="font-body text-xs text-charcoal">{item.name}</p>
                    <p className="font-body text-xs text-charcoal/50">{item.selectedSize} × {item.quantity}</p>
                  </div>
                  <p className="font-body text-xs">PKR {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-warm-beige/30 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-charcoal/60">Subtotal</span><span>PKR {cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-charcoal/60">Shipping</span><span>{shipping === 0 ? "FREE" : `PKR ${shipping}`}</span></div>
              <div className="flex justify-between font-medium pt-2 border-t border-warm-beige/30">
                <span>Total</span>
                <span className="font-display text-lg">PKR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}