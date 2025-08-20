// Mock data for demo purposes
export const setupMockData = () => {
  // Set up a fake saved payment method for express checkout demo
  if (typeof window !== 'undefined' && !localStorage.getItem('paymentToken')) {
    const mockPayment = {
      id: 'card_1234',
      last4: '4242',
      brand: 'Visa',
      token: 'tok_visa_demo_insecure' // Intentionally insecure for demo
    };
    localStorage.setItem('paymentToken', JSON.stringify(mockPayment));
    
    // Also set a saved address
    const mockAddress = {
      street: '123 Demo Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    };
    localStorage.setItem('lastShippingAddress', JSON.stringify(mockAddress));
  }
};