import { Router } from 'express';
import { createCheckoutSession, createCustomerPortal, handleWebhook } from '../controllers/stripeController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/create-checkout-session', auth, createCheckoutSession);
router.post('/customer-portal', auth, createCustomerPortal);
router.post('/webhook', handleWebhook);

export default router;
