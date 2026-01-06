import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// console.log('Starting application...', process.env);


import { connectDB } from './config/database.js';
import Order from './models/order.js';


import { errorHandler } from './middleware/errorHandler.js';

import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';

import { handleStripeWebhook } from './webhooks/stripeWebhook.js';

console.log('All imports loaded successfully');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/orders', orderRoutes);

app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

async function startServer() {
  try {
    console.log('Starting server...');
    
    // Connect to MongoDB (local instance)
    console.log(' Connecting to MongoDB database...');
    await connectDB();
    console.log(' MongoDB connected successfully');

    // Get port from environment or use default
    const PORT = process.env.PORT || 5000;

    // Start the Express server
    app.listen(PORT, () => {
      console.log('=================================');
      console.log(` Server started successfully`);
      console.log(` Server running on port ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log('=================================');
    });
  } catch (error) {
    console.error(' Failed to start server:', error.message);
    process.exit(1);
  }
}

console.log('Calling startServer...');
startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

export default app;

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
