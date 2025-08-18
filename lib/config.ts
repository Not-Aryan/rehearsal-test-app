// Environment configuration
export const config = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Rehearsal Test E-Commerce',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // Feature flags
  features: {
    auth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
    checkout: process.env.NEXT_PUBLIC_ENABLE_CHECKOUT === 'true',
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
  },
  
  // Test mode
  testMode: process.env.NEXT_PUBLIC_TEST_MODE === 'true',
  
  // Test data attributes for automation
  testIdPrefix: 'rehearsal-',
} as const

export const isStaging = config.environment === 'staging'
export const isProduction = config.environment === 'production'
export const isDevelopment = config.environment === 'development'

// Helper to get test IDs for elements
export const getTestId = (id: string) => `${config.testIdPrefix}${id}`