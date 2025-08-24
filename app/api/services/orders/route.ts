import { NextRequest, NextResponse } from "next/server";

// Store orders in memory for demo purposes
// In production, use a database like PostgreSQL, MongoDB, etc.
interface Order {
  orderId: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  totalAmount: number;
  timestamp: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
}
const orders: Order[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    streetAddress,
    city,
    state,
    zipcode,
    items,
    totalAmount,
    timestamp,
  } = body;

  // Generate a plausible e-commerce order id: e.g. "ORD-20240610-ABCD"
  function generateOrderId() {
    const date = new Date();
    const y = date.getFullYear().toString().slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const letters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    return `${letters}-${y}${m}${d}`;
  }
  const orderId = generateOrderId();
  const arrivalDate = new Date(Date.now() + 3 * 86_400_000)
    .toISOString()
    .split("T")[0];

  // Store order in memory instead of writing to file system
  // This will persist for the lifetime of the serverless function instance
  orders.push({
    orderId,
    name,
    streetAddress,
    city,
    state,
    zipcode,
    totalAmount,
    timestamp,
    items,
  });
  
  console.log(`Order ${orderId} stored in memory. Total orders: ${orders.length}`);

  return NextResponse.json({
    orderId,
    status: "success",
    message: "Order placed successfully",
    arrivalDate,
    orderDetails: {
      name,
      streetAddress,
      city,
      state,
      zipcode,
      totalAmount,
      timestamp,
      items,
    },
  });
}
