# Sample Test App

![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)

A demo e‑commerce site used as the target for the automated testing agent. It runs on Next.js 14 and exposes several flows for the agent to exercise.

## Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.development
   ```

   Adjust the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values if desired.
   Make sure to use the same credentials in the frontend config UI (default values are set in `frontend/lib/constants.ts`).

2. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
   The app will be available at [http://localhost:3005](http://localhost:3005).

## Dataset

The dataset used in this demo is courtesy of the Fashion Product Images dataset on Kaggle.
# Test change for PR webhook
# Triggering smoke tests with correct org
# Testing with URL replacement fix
# Fix: Add .not.toBeVisible() conversion
# Test CDP-based Playwright execution
# Fix: Use CDP URL from create response
# Add comprehensive logging
# Show full logs
# Trigger full logging test
