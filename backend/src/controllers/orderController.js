import { Order } from '../models/index.js';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { customerEmail, items, totalAmount } = req.body;

      if (!customerEmail || !items || totalAmount === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: customerEmail, items, and totalAmount are required',
        });
      }


      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Items must be a non-empty array',
        });
      }

      const order = await Order.create({
        customerEmail,
        items,
        totalAmount,
        paymentStatus: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);


      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  
  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { paymentStatus, transactionId, stripePaymentIntentId } = req.body;

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
      }
      if (transactionId) {
        order.transactionId = transactionId;
      }
      if (stripePaymentIntentId) {
        order.stripePaymentIntentId = stripePaymentIntentId;
      }


      await order.save();

      return res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const { status, email } = req.query;

      const filter = {};
      if (status) {
        filter.paymentStatus = status;
      }
      if (email) {
        filter.customerEmail = email;
      }

      const orders = await Order.find(filter).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
