import { currentUser } from '@clerk/nextjs/server';
import { getOrCreateUser } from '@/lib/getOrCreateUser';
import PremiumProvider from '@/components/PremiumProvider';
import { validateUserSubscription } from '@/lib/checkSubscription';
import { SignedOut, SignInButton } from '@clerk/nextjs';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded bg-primary text-white text-sm">
              Entre para continuar
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  }

  const clerkId = user.id;
  const email = user.emailAddresses?.[0]?.emailAddress;

  // Ensure user exists
  await getOrCreateUser(clerkId, email);

    const userSub = await validateUserSubscription(clerkId)
    const isPremium = userSub ? userSub.ispremium : false

  return (
    <PremiumProvider isPremium={isPremium}>
      {children}
    </PremiumProvider>
  );
}
