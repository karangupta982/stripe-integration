import { stripe } from '../config/stripe.js';


class StripeService {
  
  async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      // Convert amount to cents and round to avoid decimals
      const amountInCents = Math.round(amount * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      throw error;
    }
  }

  
  async createCheckoutSession(items, customerEmail, successUrl, cancelUrl, metadata = {}) {
    try {
      // Transform items to Stripe line_items format
      const lineItems = items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.images || [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        customer_email: customerEmail,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
      });

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      throw error;
    }
  }

  
  async retrievePaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error retrieving payment intent:', error.message);
      throw error;
    }
  }

  
  async retrieveCheckoutSession(sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      console.error('Error retrieving checkout session:', error.message);
      throw error;
    }
  }

 
  constructWebhookEvent(payload, signature, secret) {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, secret);
      return event;
    } catch (error) {
      console.error('Error constructing webhook event:', error.message);
      throw error;
    }
  }
}

// Export a singleton instance of StripeService
export default new StripeService();
