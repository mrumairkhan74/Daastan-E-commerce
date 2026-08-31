"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Checkout({ isOpen, onClose, cart }) {
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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setOrderComplete(true);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item => 
      `• ${item.name} (${item.selectedSize || 'N/A'}) x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛒 *DASTAN Order*\n\n*Customer Details:*\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city} ${formData.postalCode}\n\n*Order Items:*\n${itemsList}\n\n*Subtotal: PKR ${subtotal.toLocaleString()}*\n*Shipping: PKR ${shipping.toLocaleString()}*\n*Total: PKR ${total.toLocaleString()}*\n\nPlease confirm my order. Thank you!`
    );

    window.open(`https://wa.me/923XXXXXXXXX?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setStep(1);
    setOrderComplete(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen py-8 px-4 flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-4xl my-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-warm-beige/10 rounded-full transition-colors z-10"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5 text-charcoal" strokeWidth={2} />
            </button>

            {orderComplete ? (
              /* Order Complete */
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
                <h2 className="font-display text-3xl text-charcoal mb-4">Order Placed!</h2>
                <p className="font-body text-charcoal/60 mb-8 max-w-md mx-auto">
                  Thank you for your order! We'll send you a confirmation email shortly with your order details.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors"
                  >
                    Confirm via WhatsApp
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full py-4 border border-charcoal/20 text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5">
                {/* Left - Form */}
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors mb-8 font-body text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                    Back to cart
                  </button>

                  <h2 className="font-display text-3xl text-charcoal mb-8">Checkout</h2>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-4 mb-8">
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

                  {/* Step 1 - Details */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                              errors.fullName ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                            }`}
                            placeholder="Ahmedullah"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                              errors.phone ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                            }`}
                            placeholder="03XX-XXXXXXX"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                            errors.email ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                          }`}
                          placeholder="ahmed@dastan.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                          Complete Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                            errors.address ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                          }`}
                          placeholder="House #, Street #, Area"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                              errors.city ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                            }`}
                            placeholder="Lahore"
                          />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border font-body text-sm focus:outline-none focus:ring-1 ${
                              errors.postalCode ? "border-red-400 focus:ring-red-400" : "border-warm-beige/30 focus:ring-charcoal/20 focus:border-charcoal"
                            }`}
                            placeholder="54000"
                          />
                          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block font-body text-sm text-charcoal/60 uppercase tracking-wider mb-2">
                          Order Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-charcoal/20 focus:border-charcoal resize-none"
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

                  {/* Step 2 - Payment */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="bg-warm-beige/10 p-6">
                        <h3 className="font-display text-lg text-charcoal mb-4">Cash on Delivery</h3>
                        <p className="font-body text-sm text-charcoal/60 leading-relaxed">
                          Pay when you receive your order. This is our standard payment method for all orders within Pakistan.
                        </p>
                      </div>

                      <div className="bg-warm-beige/10 p-6">
                        <h3 className="font-display text-lg text-charcoal mb-4">Order Summary</h3>
                        <div className="space-y-3 font-body text-sm">
                          <div className="flex justify-between text-charcoal/70">
                            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                            <span>PKR {subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-charcoal/70">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
                          </div>
                          <div className="border-t border-warm-beige/30 pt-3 flex justify-between font-medium">
                            <span>Total</span>
                            <span className="font-display text-xl">PKR {total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 border border-charcoal/20 text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePlaceOrder}
                          disabled={loading}
                          className="flex-1 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </button>
                      </div>

                      <button
                        onClick={handleWhatsAppOrder}
                        className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors"
                      >
                        Order via WhatsApp Instead
                      </button>

                      <p className="text-center text-xs text-charcoal/40 font-body">
                        By placing this order, you agree to our Terms & Conditions and Privacy Policy.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Right - Order Summary */}
                <div className="lg:col-span-2 bg-warm-beige/5 p-8 lg:p-12 border-l border-warm-beige/20">
                  <h3 className="font-display text-xl text-charcoal mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <div 
                          className="w-16 h-20 rounded-none shadow-sm flex-shrink-0" 
                          style={{ backgroundColor: item.colorCode || "#E8E0D0" }}
                        />
                        <div className="flex-1">
                          <p className="font-body text-sm text-charcoal font-medium">{item.name}</p>
                          <p className="font-body text-xs text-charcoal/50">
                            {item.selectedSize} × {item.quantity}
                          </p>
                          <p className="font-body text-sm text-charcoal mt-1">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-warm-beige/30 pt-4 space-y-3">
                    <div className="flex justify-between font-body text-sm text-charcoal/70">
                      <span>Subtotal</span>
                      <span>PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-charcoal/70">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `PKR ${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between font-display text-xl text-charcoal pt-3 border-t border-warm-beige/30">
                      <span>Total</span>
                      <span>PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}