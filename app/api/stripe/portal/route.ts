import { auth } from "@clerk/nextjs/server";
import { stripe } from '@/lib/stripe';
import { supabase } from "@/lib/supabase";
import { NextResponse } from 'next/server';

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: user } = await supabase
  .from('users')
  .select('stripe_customer_id')
  .eq('clerk_id', userId)
  .single();

if (!user?.stripe_customer_id) {
  return NextResponse.json({ error: 'Stripe customer ID not found' }, { status: 404 });
}
const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
