// context/PremiumContext.tsx
'use client';
import { createContext, useContext } from 'react';

export const PremiumContext = createContext(false);
export const usePremium = () => useContext(PremiumContext);
