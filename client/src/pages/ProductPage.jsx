"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Truck, RefreshCw, Shield, Check, Minus, Plus, Ruler, ChevronRight } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { success, error } = useToast();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];
  const product = allProducts.find(p => p.id === id);
  const isJewelry = product?.category === "jewelry";
  const isShirt = product?.category === "shirts";

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize(null);
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-charcoal mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-charcoal/60 hover:text-charcoal underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isShirt && !selectedSize) {
      error("Please select a size");
      return;
    }
    const size = isJewelry ? "One Size" : selectedSize;
    addToCart(product, size, quantity);
    success(`${product.name} added to bag!`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} from DASTAN`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      success("Link copied to clipboard!");
    }
  };

  const frontImage = isJewelry 
    ? `/images/jewelry/${product.id}.jpg` 
    : `/images/shirts/${product.id}-front.jpg`;
  const backImage = isJewelry ? null : `/images/shirts/${product.id}-back.jpg`;

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-warm-beige/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm font-body text-charcoal/50">
            <Link to="/" className="hover:text-charcoal">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-charcoal">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-warm-beige/10 overflow-hidden"
            >
              <img
                src={selectedImage === 0 ? frontImage : (backImage || frontImage)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {backImage && (
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`w-20 h-24 border-2 transition-all ${
                    selectedImage === 0 ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={frontImage} alt="Front" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImage(1)}
                  className={`w-20 h-24 border-2 transition-all ${
                    selectedImage === 1 ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={backImage} alt="Back" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            {product.badges?.length > 0 && (
              <div className="flex gap-2">
                {product.badges.map(badge => (
                  <span key={badge} className="px-3 py-1 text-xs font-medium uppercase bg-charcoal text-white">
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-3xl md:text-4xl text-charcoal">{product.name}</h1>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl">PKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-charcoal/40 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="font-body text-charcoal/70 leading-relaxed">{product.description}</p>

            {/* Color */}
            <div>
              <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">
                Color: <span className="text-charcoal font-medium">{product.color}</span>
              </p>
              <div 
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg" 
                style={{ backgroundColor: product.colorCode }}
              />
            </div>

            {/* Size Selection - Only for shirts */}
            {isShirt && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider">
                    Size: {selectedSize && <span className="text-charcoal font-medium">{selectedSize}</span>}
                  </p>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 text-sm text-charcoal/50 hover:text-charcoal"
                  >
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 font-body text-sm uppercase transition-all ${
                        selectedSize === size
                          ? "border-charcoal bg-charcoal text-white"
                          : "border-warm-beige/30 hover:border-charcoal"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-red-500 mt-2">Please select a size</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-warm-beige/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-charcoal/50 hover:text-charcoal"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-3 text-charcoal/50 hover:text-charcoal"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-charcoal/50">{product.stockCount} in stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
              >
                Add to Bag
              </motion.button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border-2 transition-all ${
                  isInWishlist(product.id)
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-warm-beige/30 hover:border-charcoal"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-4 border-2 border-warm-beige/30 hover:border-charcoal transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-warm-beige/20">
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <Truck className="w-4 h-4" />
                <span>Free shipping on orders over PKR 5,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <RefreshCw className="w-4 h-4" />
                <span>14-day easy exchange policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <Shield className="w-4 h-4" />
                <span>Cash on Delivery available</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-warm-beige/20">
              <h3 className="font-body text-sm font-medium text-charcoal uppercase tracking-wider mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-charcoal/50">Fabric</p>
                  <p className="text-charcoal">{product.fabric || "Premium Materials"}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">GSM</p>
                  <p className="text-charcoal">{product.gsm || "N/A"}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Fit</p>
                  <p className="text-charcoal">{product.fit || "Standard"}</p>
                </div>
                <div>
                  <p className="text-charcoal/50">Category</p>
                  <p className="text-charcoal capitalize">{product.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-warm-beige/20">
            <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={() => window.location.href = `/product/${p.id}`}
                  onAddToCart={() => {
                    const size = p.sizes?.[1] || p.sizes?.[0];
                    if (size) {
                      addToCart(p, size, 1);
                      success(`${p.name} added to bag!`);
                    }
                  }}
                  onWishlistToggle={toggleWishlist}
                  isInWishlist={isInWishlist(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-lg w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display text-xl mb-4">Size Guide</h3>
            <table className="w-full text-sm mb-4">
              <thead className="bg-warm-beige/10">
                <tr>
                  <th className="p-2 text-left">Size</th>
                  <th className="p-2 text-left">Chest</th>
                  <th className="p-2 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2">S</td><td className="p-2">36-38"</td><td className="p-2">28"</td></tr>
                <tr><td className="p-2">M</td><td className="p-2">38-40"</td><td className="p-2">29"</td></tr>
                <tr><td className="p-2">L</td><td className="p-2">40-42"</td><td className="p-2">30"</td></tr>
                <tr><td className="p-2">XL</td><td className="p-2">42-44"</td><td className="p-2">31"</td></tr>
                <tr><td className="p-2">XXL</td><td className="p-2">44-46"</td><td className="p-2">32"</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2 border border-charcoal text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}