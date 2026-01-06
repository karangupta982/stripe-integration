import express from 'express';
import orderController from '../controllers/orderController.js';
import { validateOrder } from '../middleware/validation.js';

const router = express.Router();


router.post('/', validateOrder, orderController.createOrder);


router.get('/', orderController.getAllOrders);


router.get('/:id', orderController.getOrder);


router.put('/:id', orderController.updateOrderStatus);

export default router;
