import stripeService from '../services/stripeService.js';
import { Order } from '../models/index.js';


export async function handleStripeWebhook(req, res) {
  try {
   
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

   
    let event;
    try {
      event = stripeService.constructWebhookEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error.message);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response to Stripe
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error.message);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}


async function handleCheckoutSessionCompleted(session) {
  console.log('Checkout session completed:', session.id);

  try {
    // Get the order ID from session metadata
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);

      if (order) {
        // Update order with successful payment status
        order.paymentStatus = 'success';
        order.transactionId = session.payment_intent;
        order.stripePaymentIntentId = session.id;
        await order.save();

        console.log(`Order ${orderId} marked as paid successfully`);
      }
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error.message);
  }
}


async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id);

  try {
    // Get the order ID from payment intent metadata
    const orderId = paymentIntent.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);

      if (order) {
        // Update order with successful payment status
        order.paymentStatus = 'success';
        order.transactionId = paymentIntent.id;
        await order.save();

        console.log(`Payment confirmed for order ${orderId}`);
      }
    }
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error.message);
  }
}


async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Payment intent failed:', paymentIntent.id);

  try {
    // Get the order ID from payment intent metadata
    const orderId = paymentIntent.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);

      if (order) {
        // Update order with failed payment status
        order.paymentStatus = 'failed';
        order.transactionId = paymentIntent.id;
        await order.save();

        console.log(`Payment failed for order ${orderId}`);
      }
    }
  } catch (error) {
    console.error('Error handling payment intent failed:', error.message);
  }
}


async function handleCheckoutSessionExpired(session) {
  console.log('Checkout session expired:', session.id);

  try {
    // Get the order ID from session metadata
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await Order.findById(orderId);

      // Only update if order is still pending
      if (order && order.paymentStatus === 'pending') {
        order.paymentStatus = 'failed';
        await order.save();

        console.log(`Order ${orderId} marked as failed due to session expiration`);
      }
    }
  } catch (error) {
    console.error('Error handling checkout session expired:', error.message);
  }
}
