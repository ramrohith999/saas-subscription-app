import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import { stripe } from '../stripe/client.js';
import { env } from '../config/env.js';

async function ensureStripeCustomer(user) {
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user._id.toString() },
  });

  user.stripeCustomerId = customer.id;
  await user.save();
  return customer.id;
}

export async function createCheckoutSession(req, res) {
  const customerId = await ensureStripeCustomer(req.user);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: env.stripeProPriceId, quantity: 1 }],
    success_url: `${env.clientUrl}/dashboard?checkout=success`,
    cancel_url: `${env.clientUrl}/pricing?checkout=cancelled`,
    metadata: { userId: req.user._id.toString() },
  });

  return res.json({ url: session.url });
}

export async function createCustomerPortal(req, res) {
  if (!req.user.stripeCustomerId) {
    return res.status(400).json({ message: 'No Stripe customer found for this user' });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: req.user.stripeCustomerId,
    return_url: `${env.clientUrl}/dashboard`,
  });

  return res.json({ url: portal.url });
}

export async function handleWebhook(req, res) {
  if (!env.stripeWebhookSecret) {
    return res.status(500).json({ message: 'Missing STRIPE_WEBHOOK_SECRET' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.stripeWebhookSecret);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const subscriptionId = session.subscription;
    const customerId = session.customer;
    const user = await User.findOne({ stripeCustomerId: customerId });

    if (user) {
      user.subscriptionPlan = 'pro';
      user.subscriptionStatus = 'active';
      await user.save();

      const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: subscriptionId },
        {
          userId: user._id,
          stripeSubscriptionId: subscriptionId,
          plan: 'pro',
          status: stripeSub.status,
          renewalDate: new Date(stripeSub.current_period_end * 1000),
        },
        { upsert: true, new: true }
      );
    }
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const localSub = await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: sub.id },
      { status: sub.status, renewalDate: new Date(sub.current_period_end * 1000) },
      { new: true }
    );

    if (localSub) {
      const user = await User.findById(localSub.userId);
      if (user) {
        user.subscriptionStatus = sub.status;
        if (sub.status !== 'active') user.subscriptionPlan = 'free';
        await user.save();
      }
    }
  }

  return res.json({ received: true });
}
