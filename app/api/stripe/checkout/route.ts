import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { plan } = await req.json(); // 'monthly' or 'yearly'
  const priceId =
    plan === 'yearly'
      ? process.env.STRIPE_PRO_YEARLY_PRICE_ID
      : process.env.STRIPE_PRO_MONTHLY_PRICE_ID;

  const email = user.emailAddresses[0]?.emailAddress;
  const clerkId = user.id;

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/precos`,
    customer_email: email, // ✅ used to look up the user in webhook
    metadata: {
      clerk_id: clerkId,      // ✅ optional backup
      user_email: email,      // ✅ optional backup
    },
    locale: 'pt-BR'
  });

  return NextResponse.json({ url: session.url });
}
