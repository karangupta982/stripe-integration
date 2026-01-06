# Stripe Integration E-Commerce Application

A full-stack e-commerce application with Stripe payment integration, featuring product browsing, shopping cart, and secure checkout.

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- Stripe account with test keys

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd stripe-integration
   ```

2. **Backend setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and Stripe keys
   npm start
   ```

3. **Frontend setup:**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with API URL and Stripe publishable key
   npm run dev
   ```

4. **Stripe CLI for webhooks:**
   ```bash
   stripe login
   stripe listen --forward-to localhost:5000/api/webhooks/stripe
   ```

## Architecture

### Backend (Express.js)
- **Port:** 5000
- **Database:** MongoDB with Mongoose
- **Payment:** Stripe Checkout & Webhooks
- **Key endpoints:**
  - `POST /api/payments/create-checkout-session` - Create payment session
  - `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Frontend (React + Vite)
- **Port:** 5173
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **API Client:** Axios

## Testing Payments

Use Stripe test cards:
- **Success:** 4242 4242 4242 4242
- **Failure:** 4000 0000 0000 0002

## Project Structure

```
stripe-integration/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Stripe config
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Stripe service
│   │   ├── webhooks/        # Webhook handlers
│   │   └── server.js        # Express app
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── services/        # API client
│   │   └── utils/           # Mock data & helpers
│   └── .env
└── README.md
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/stripe_checkout
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```