# Frontend - E-Commerce App

React application for product browsing and Stripe checkout.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with API URL and Stripe publishable key
npm run dev
```

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Features

- Product browsing with responsive grid
- Shopping cart with modal overlay
- Email validation and checkout form
- Stripe payment integration
- Success/failure payment pages

## Testing Payments

**Success Card:** 4242 4242 4242 4242
**Failure Card:** 4000 0000 0000 0002

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Route components
├── services/        # API client
├── utils/           # Mock data & helpers
└── assets/          # Static assets
```

## Key Components

- **ProductCard** - Individual product display
- **CartIcon** - Floating cart button with badge
- **CartModal** - Cart contents overlay
- **CheckoutForm** - Email validation and order summary

## API Integration

Uses axios for API calls:
- `createCheckoutSession()` - Initiate Stripe payment
- `verifyPayment()` - Confirm payment status
- `createOrder()` - Create order record
- `getOrder()` - Fetch order details

## Build & Deploy

```bash
npm run build
```

Deploy `dist/` folder to static hosting.
