'use client';

import { PremiumContext } from '@/context/PremiumContext';

export default function PremiumProvider({
  isPremium,
  children,
}: {
  isPremium: boolean;
  children: React.ReactNode;
}) {
  return (
    <PremiumContext.Provider value={isPremium}>
      {children}
    </PremiumContext.Provider>
  );
}
