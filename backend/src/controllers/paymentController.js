import stripeService from '../services/stripeService.js';
import { Order } from '../models/index.js';

class PaymentController {
  
  async createCheckoutSession(req, res, next) {
    try {
      const { items, customerEmail, orderId } = req.body;

      if (!items || !customerEmail) {
        return res.status(400).json({
          success: false,
          message: 'Items and customerEmail are required',
        });
      }

      const totalAmount = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      let order;

      if (orderId) {
        order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({
            success: false,
            message: 'Order not found',
          });
        }
      } else {
        
        order = await Order.create({
          customerEmail,
          items,
          totalAmount,
          paymentStatus: 'pending',
        });
      }

      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const successUrl = `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${frontendUrl}/payment-failed?orderId=${order._id.toString()}`;

      
      const session = await stripeService.createCheckoutSession(
        items,
        customerEmail,
        successUrl,
        cancelUrl,
        { orderId: order._id.toString() }
      );


      order.stripePaymentIntentId = session.id;
      await order.save();

      return res.status(200).json({
        success: true,
        sessionId: session.id,
        url: session.url,
        orderId: order._id,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPaymentIntent(req, res, next) {
    try {
      const { amount, currency, orderId } = req.body;

      if (!amount) {
        return res.status(400).json({
          success: false,
          message: 'Amount is required',
        });
      }

      const metadata = {};
      if (orderId) {
        metadata.orderId = orderId;
      }

      const paymentIntent = await stripeService.createPaymentIntent(
        amount,
        currency || 'usd',
        metadata
      );

      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      next(error);
    }
  }

  
  async getCheckoutSession(req, res, next) {
    try {
      const { sessionId } = req.params;

      const session = await stripeService.retrieveCheckoutSession(sessionId);

      return res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req, res, next) {
    try {
      const { sessionId } = req.body;

      
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: 'Session ID is required',
        });
      }


      const session = await stripeService.retrieveCheckoutSession(sessionId);

      
      if (session.payment_status === 'paid') {

        const orderId = session.metadata?.orderId;

        let order;
        if (orderId) {
          
          order = await Order.findById(orderId);

          if (order) {
            order.paymentStatus = 'success';
            order.transactionId = session.payment_intent;
            await order.save();
          }
        }

        return res.status(200).json({
          success: true,
          message: 'Payment verified successfully',
          status: 'paid',
          orderId,
          email: session.customer_email,
          amount: session.amount_total,
        });
      }

      
      return res.status(200).json({
        success: false,
        message: 'Payment not completed',
        status: session.payment_status,
      });
    } catch (error) {
      next(error);
    }
  }
}


export default new PaymentController();
