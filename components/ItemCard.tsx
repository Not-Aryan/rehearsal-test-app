import React from "react";

import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus } from "lucide-react";
import { ShoppingCart } from "lucide-react";

interface ItemCardProps {
  item: {
    id: number;
    productDisplayName: string;
    baseColour: string;
    priceUSD?: number;
    imageURL: string;
    stock?: number; // Add stock field
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const addItem = useCartStore((s) => s.addItem);
  const increment = useCartStore((s) => s.incrementItem);
  const decrement = useCartStore((s) => s.decrementItem);
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.id === item.id)?.quantity || 0
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    addItem(item.id);
  };

  // Check stock levels for inventory status
  const isOutOfStock = item.stock === 0;
  const isLowStock = !isOutOfStock && item.stock !== undefined && item.stock > 0 && item.stock <= 3;

  return (
    <div className="flex flex-col h-full cursor-pointer bg-stone-100 p-4 rounded-sm relative">
      {/* Stock Status Badges */}
      {isOutOfStock && (
        <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold z-10 shadow-lg">
          Out of Stock
        </div>
      )}
      {isLowStock && (
        <div className="absolute top-6 right-6 bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-semibold z-10 shadow-lg">
          Only {item.stock} left!
        </div>
      )}
      {/* Product image + title */}
      <div className="flex flex-col items-center flex-grow">
        <img
          src={item.imageURL}
          alt={item.productDisplayName}
          className={`w-full object-cover ${isOutOfStock ? "opacity-50" : ""}`}
        />
        <div className="w-full m-4">
          <h3 className="font-medium text-sm text-stone-800 line-clamp-2">
            {item.productDisplayName}
          </h3>
        </div>
      </div>

      <div className="w-full py-2 flex items-center justify-between">
        <span className="text-sm font-medium text-stone-900">
          {`$${item.priceUSD ?? "N/A"}`}
        </span>
        {isOutOfStock ? (
          <span className="text-xs text-red-600 font-medium">Out of Stock</span>
        ) : quantity > 0 ? (
          <div className="flex items-center md:gap-1">
            <div
              onClick={(e) => {
                e.stopPropagation();
                decrement(item.id);
              }}
              className="px-2 py-1 text-xs cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </div>
            <span className="text-sm w-4 text-center">{quantity}</span>
            <div
              onClick={(e) => {
                e.stopPropagation();
                increment(item.id);
              }}
              className="px-2 py-1 text-xs cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </div>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            className="text-[10px] md:text-xs font-medium whitespace-nowrap text-white bg-stone-900 px-3 py-1.5 rounded-sm cursor-pointer hover:bg-stone-700 transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
// Test trigger
// Trigger webhook
// Test Modal trigger
// Trigger correct Modal app
// Test Modal v2 invocation
// Test check_suite and Modal trigger
// Debug webhook processing
// Fixed webhook issues
// Verify Modal v2 URL
// Test Modal SDK integration
// Test Modal positional arg
// Test Modal with updated payload
// Test Modal with typed payload
// Analyze Modal integration issue
// Test Modal with request kwarg
// Test Modal with Python dict handling
// Test Modal after Python deployment
// Test with correct ngrok URLs
// Test with api_endpoint field
// Test with Modal env var for API URL
// Test e2e with fixed UUID handling
// Test with Vercel env
// Test with Vercel env 2
// Test trigger for Modal integration fix
// Final test for complete PR automation flow
// Test comment to trigger PR webhook - Tue Aug 19 20:29:06 PDT 2025
// Another test comment - testing fixed Modal function
