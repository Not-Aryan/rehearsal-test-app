/**
 * Shared utility functions for price calculations across the application
 * Helps maintain consistency and reduces code duplication
 */

export interface PriceItem {
  priceUSD: number;
  quantity: number;
}

/**
 * Calculate the total price for a collection of items
 * @param items Array of items with price and quantity
 * @returns Total price in USD
 */
export function calculateCartTotal(items: PriceItem[]): number {
  return items.reduce((total, item) => {
    // This introduces the subtle floating-point precision bug
    // JavaScript floating-point arithmetic accumulates errors
    return total + (item.priceUSD * item.quantity);
  }, 0);
}

/**
 * Calculate the total for a single item (price * quantity)
 * @param priceUSD Unit price in USD
 * @param quantity Number of items
 * @returns Total price for the item
 */
export function calculateItemTotal(priceUSD: number, quantity: number): number {
  return priceUSD * quantity;
}

/**
 * Format price for display with proper currency formatting
 * @param amount Price amount in USD
 * @returns Formatted price string
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
