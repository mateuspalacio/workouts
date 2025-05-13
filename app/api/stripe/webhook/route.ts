// app/api/stripe/webhook/route.ts

import { supabase } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read the raw body
async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function GET() {
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  console.log('✅ Stripe webhook route hit');

  const rawBody = await buffer(req.body!);
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log('🔔 Received event:', event.type);

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkId = session.metadata?.clerk_id;
    console.log(clerkId)
    if (clerkId && session.customer) {
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer.id;
      const { error } = await supabase
        .from('users')
        .update({
          ispremium: true,
          stripe_customer_id: customerId,
        })
        .eq('clerk_id', clerkId);
        if (error) {
          console.error('❌ Supabase update error:', error.message);
        }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id;

    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    const email = customer.email;

    if (email) {
      const { data: user } = await supabase
        .from('users')
        .select('clerk_id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (user?.clerk_id) {
        await supabase
          .from('users')
          .update({ ispremium: false })
          .eq('clerk_id', user.clerk_id);
      }
    }
  }
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
  
    const customerId = typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id;
  
    const { cancel_at_period_end, status } = subscription;
  
    const current_period_end =  subscription.items.data[0].current_period_end;

    const { data: user } = await supabase
      .from('users')
      .select('clerk_id')
      .eq('stripe_customer_id', customerId)
      .single();
  
    if (!user?.clerk_id) return new Response('User not found', { status: 404 });
  
    // Optional: update info like "subscription_ends_at"
    await supabase
      .from('users')
      .update({
        cancel_at_period_end: cancel_at_period_end,
        subscription_status: status, // e.g. "active", "canceled", "incomplete"
        subscription_ends_at: new Date(current_period_end * 1000).toISOString(),
      })
      .eq('clerk_id', user.clerk_id);
  }
  
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
  });
}
