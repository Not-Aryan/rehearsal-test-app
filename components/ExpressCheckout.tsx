"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { fetchStyleById } from "@/lib/styleService";

interface SavedPayment {
  id: string;
  last4: string;
  brand: string;
  token: string;
}

interface ItemData {
  id: number;
  productDisplayName: string;
  priceUSD?: number;
  imageURL: string;
}

export default function ExpressCheckout() {
  const [processing, setProcessing] = useState(false);
  const [productData, setProductData] = useState<Record<number, ItemData>>({});
  const { items, clear } = useCartStore();
  const router = useRouter();

  // Load product data for cart items
  useEffect(() => {
    const loadProductData = async () => {
      const data: Record<number, ItemData> = {};
      for (const item of items) {
        const product = await fetchStyleById(item.id) as ItemData;
        if (product) {
          data[item.id] = product;
        }
      }
      setProductData(data);
    };
    if (items.length > 0) {
      loadProductData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // BUG 1: Stores sensitive payment token in localStorage (XSS vulnerability)
  const getSavedPayment = (): SavedPayment | null => {
    const saved = localStorage.getItem('paymentToken');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  };

  // BUG 2: No rounding, floating point errors in total calculation
  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      const price = productData[item.id]?.priceUSD || 0;
      // This will cause floating point errors like $89.97000000000001
      total += price * item.quantity;
    });
    return total; // Should be: parseFloat(total.toFixed(2))
  };

  // BUG 3: No debounce, allows double-charging on rapid clicks
  const handleExpressCheckout = async () => {
    const savedPayment = getSavedPayment();
    
    if (!savedPayment) {
      alert("No saved payment method found");
      return;
    }

    // BUG 4: Gets saved address without null check - will crash
    const savedAddress = localStorage.getItem('lastShippingAddress');
    const { street, city, state, zip } = JSON.parse(savedAddress!); // Will throw if null

    try {
      // BUG 5: No check for processing state, user can click multiple times
      // Should check if (processing) return; at the start
      
      const total = calculateTotal();
      
      // Prepare items with product data
      const itemsWithData = items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        productDisplayName: productData[item.id]?.productDisplayName || 'Unknown',
        priceUSD: productData[item.id]?.priceUSD || 0
      }));

      // Simulate payment processing
      const response = await fetch('/api/express-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsWithData,
          total,
          paymentToken: savedPayment.token, // Sending token directly
          shipping: { street, city, state, zip }
        })
      });

      // BUG 6: Sets processing AFTER the API call starts (too late!)
      setProcessing(true);

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      // BUG 7: Clears cart before confirming inventory availability
      // Should verify stock BEFORE charging and clearing cart
      clear();
      
      router.push('/order-success');
    } catch {
      // BUG 8: Doesn't properly handle partial failures
      // If payment went through but inventory check failed, no refund!
      alert("Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  const savedPayment = getSavedPayment();
  const total = calculateTotal();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold mb-3">Express Checkout</h3>
      {savedPayment ? (
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            Using saved card ending in {savedPayment.last4}
          </div>
          <div className="text-lg font-semibold">
            Total: ${total}
          </div>
          {/* BUG 9: Button not disabled during processing */}
          <Button 
            onClick={handleExpressCheckout}
            className="w-full"
            variant="default"
          >
            <Zap className="w-4 h-4 mr-2" />
            {processing ? "Processing..." : "Express Checkout"}
          </Button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">
          Complete a regular checkout first to save your payment method
        </div>
      )}
    </div>
  );
}