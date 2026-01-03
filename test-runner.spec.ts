import { test, expect } from '@playwright/test';

test('cart-quantity-management', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://rehearsal-shop.vercel.app/');

  // Add "Turtle Check Men Navy Blue Shirt" to cart by clicking the cart icon
  await page.locator('svg').nth(3).click();

  // Verify the cart badge shows 1 item
  await expect(page.getByRole('link', { name: '1' })).toBeVisible();

  // Navigate to the cart page
  await page.getByRole('link', { name: '1' }).click();

  // Verify we're on the cart page
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();

  // Verify initial cart state: quantity = 1, total = $35.85
  await expect(page.getByRole('combobox')).toHaveValue('1');
  await expect(page.getByText('$35.85').last()).toBeVisible(); // Total price

  // Increment quantity to 2
  await page.getByRole('combobox').selectOption(['2']);

  // Verify cart badge updates to 2 items
  await expect(page.getByRole('link', { name: '2' })).toBeVisible();

  // Verify quantity is now 2 and total is $71.70 (2 × $35.85)
  await expect(page.getByRole('combobox')).toHaveValue('2');
  await expect(page.getByText('$71.70').last()).toBeVisible();

  // Decrement quantity back to 1
  await page.getByRole('combobox').selectOption(['1']);

  // Verify cart badge updates back to 1 item
  await expect(page.getByRole('link', { name: '1' })).toBeVisible();

  // Verify quantity is back to 1 and total is $35.85
  await expect(page.getByRole('combobox')).toHaveValue('1');
  await expect(page.getByText('$35.85').last()).toBeVisible();

  // Remove item from cart using trash icon
  await page.locator('svg').nth(3).click();

  // Verify cart is empty
  await expect(page.getByText('Your cart is empty.')).toBeVisible();
  await expect(page.getByText('$0.00')).toBeVisible();

  // Verify cart badge no longer shows a number
  await expect(page.getByRole('link', { name: /^\d+$/ })).not.toBeVisible();
});
