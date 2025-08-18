# Staging Environment Setup

This e-commerce test application is configured for automated testing with Rehearsal.

## 🌐 Staging URL

Once deployed to Vercel, your staging URL will be:
- Primary: `https://rehearsal-test-app.vercel.app`
- Branch previews: `https://rehearsal-test-app-<branch>.vercel.app`

## 🚀 Deployment

The app is automatically deployed to Vercel on:
- Push to `main` branch (production)
- Push to `staging` branch (staging environment)
- Pull requests (preview deployments)

## 🧪 Test Configuration

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_APP_NAME="Rehearsal Test E-Commerce (Staging)"
NEXT_PUBLIC_TEST_MODE=true
```

### Test IDs

All interactive elements have test IDs with the prefix `rehearsal-`:

- Login page:
  - `data-testid="rehearsal-username-input"`
  - `data-testid="rehearsal-password-input"`
  - `data-testid="rehearsal-login-button"`
  - `data-testid="rehearsal-login-error"`

### Test Credentials

For the staging environment (with the authentication bug on PR #1):
- Username: `admin`
- Password: (any or none due to bug)

For normal testing:
- Username: `user`
- Password: `password`

## 📝 Test Scenarios

The staging environment is perfect for testing:

1. **Authentication Flow**
   - Login with valid credentials
   - Login with invalid credentials
   - Session persistence
   - Logout functionality

2. **E-Commerce Features**
   - Browse products
   - Add to cart
   - Checkout process
   - Order confirmation

3. **Security Vulnerabilities** (PR #1)
   - Authentication bypass for admin user
   - Password validation removal

## 🔧 Local Development

Run the staging environment locally:

```bash
# Install dependencies
npm install

# Run with staging config
npm run dev

# App runs on http://localhost:3005
```

## 🎯 Integration with Rehearsal

This staging environment is designed to work with:
- **Claude Code PR Analyzer**: Analyzes PRs and generates test cases
- **OnKernel Browser Sessions**: Executes browser-based tests
- **OpenAI CUA**: Computer use for UI testing
- **Stagehand**: Alternative browser automation

## 📊 Monitoring

Check test execution at:
- Vercel Dashboard: Deploy status and logs
- Rehearsal Dashboard: Test execution results
- OnKernel Browser: Live test sessions

## 🔐 Security Notes

The staging environment intentionally includes security vulnerabilities for testing:
- PR #1: Authentication bypass vulnerability
- This is for testing purposes only
- Never deploy these vulnerabilities to production

## 🚦 Status

- ✅ Vercel configuration ready
- ✅ Test IDs implemented
- ✅ Environment variables configured
- ✅ Staging branch setup
- 🔄 Awaiting Vercel deployment

## Next Steps

1. Push to GitHub to trigger Vercel deployment
2. Configure environment variables in Vercel dashboard
3. Update API endpoint in Modal function to use staging URL
4. Run test suite against staging environment