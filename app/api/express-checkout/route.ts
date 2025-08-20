import { NextRequest, NextResponse } from 'next/server';

// Mock payment processor
async function chargeCard(token: string, amount: number) {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    transactionId: `txn_${Date.now()}`,
    amount
  };
}

// Mock inventory check
async function checkInventory(items: any[]) {
  // Simulate inventory check
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Randomly make some items out of stock for demo
  return items.map(item => ({
    ...item,
    inStock: Math.random() > 0.3 // 30% chance of being out of stock
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total, paymentToken, shipping } = body;

    // BUG: Process payment BEFORE checking inventory
    // This means customer gets charged even if items are out of stock
    const paymentResult = await chargeCard(paymentToken, total);
    
    if (!paymentResult.success) {
      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      );
    }

    // BUG: Inventory check happens AFTER payment
    // If items are out of stock, payment is already processed!
    const inventoryCheck = await checkInventory(items);
    const outOfStockItems = inventoryCheck.filter(item => !item.inStock);
    
    if (outOfStockItems.length > 0) {
      // BUG: No refund logic here! Customer was already charged
      return NextResponse.json(
        { 
          error: 'Some items are out of stock',
          outOfStockItems,
          // Payment was already processed but we're returning an error!
          transactionId: paymentResult.transactionId
        },
        { status: 400 }
      );
    }

    // Create order
    const order = {
      id: `order_${Date.now()}`,
      items,
      total,
      shipping,
      transactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      order 
    });
    
  } catch (error) {
    // BUG: Generic error doesn't distinguish between payment failures
    // and other errors. Payment might have gone through!
    return NextResponse.json(
      { error: 'Express checkout failed' },
      { status: 500 }
    );
  }
}