import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();


router.post('/create-checkout-session', paymentController.createCheckoutSession);

router.post('/create-payment-intent', paymentController.createPaymentIntent);


router.get('/session/:sessionId', paymentController.getCheckoutSession);


router.post('/verify', paymentController.verifyPayment);

export default router;
