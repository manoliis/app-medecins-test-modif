import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async (priceId: string, userId: string) => {
  // For demo purposes, simulate a successful checkout session
  return 'demo_session_id';
};

export const createSubscription = async (priceId: string, userId: string) => {
  // For demo purposes, simulate a successful subscription
  return {
    id: 'demo_subscription_id',
    status: 'active',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
};

export const cancelSubscription = async (subscriptionId: string) => {
  // For demo purposes, simulate a successful cancellation
  return true;
};