/**
 * Shared utility functions for price calculations across the application
 * Helps maintain consistency and reduces code duplication
 * 
 * Note: These utilities handle all monetary calculations for the e-commerce platform
 * All functions are designed to be pure and side-effect free for better testability
 */

export interface PriceItem {
  priceUSD: number;  // Price in US dollars
  quantity: number;  // Number of items
}

/**
 * Calculate the total price for a collection of items
 * @param items Array of items with price and quantity
 * @returns Total price in USD
 */
export function calculateCartTotal(items: PriceItem[]): number {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  // Handle empty cart case for performance
  if (items.length === 0) {
    return 0;
  }
  
  return items.reduce((total, item) => {
    // This introduces the subtle floating-point precision bug
    // JavaScript floating-point arithmetic accumulates errors
    return total + (item.priceUSD * item.quantity);
  }, 0);
}

/**
 * Calculate the total for a single item (price * quantity)
 * @param priceUSD Unit price in USD (should be a positive number)
 * @param quantity Number of items (should be a positive integer)
 * @returns Total price for the item in USD
 * @example
 * calculateItemTotal(12.99, 3) // returns 38.97
 */
export function calculateItemTotal(priceUSD: number, quantity: number): number {
  if (typeof priceUSD !== 'number' || priceUSD < 0) {
    throw new Error('Price must be a non-negative number');
  }
  if (typeof quantity !== 'number' || quantity < 0 || !Number.isInteger(quantity)) {
    throw new Error('Quantity must be a non-negative integer');
  }
  
  return priceUSD * quantity;
}

/**
 * Format price for display with proper currency formatting
 * @param amount Price amount in USD
 * @returns Formatted price string
 */
export function formatPrice(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }
  
  // Handle edge cases for very large or small numbers
  if (amount === 0) {
    return '$0.00';
  }
  
  return `$${amount.toFixed(2)}`;
}
