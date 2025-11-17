import React, { createContext, useContext, useState } from 'react';
import type { BeltLevel } from '../constants/theme';

type BeltContextType = {
  belt: BeltLevel | null;
  setBelt: (belt: BeltLevel | null) => void;
};

const BeltContext = createContext<BeltContextType | undefined>(undefined);

export function BeltProvider({ children }: { children: React.ReactNode }) {
  const [belt, setBelt] = useState<BeltLevel | null>(null);
  return (
    <BeltContext.Provider value={{ belt, setBelt }}>
      {children}
    </BeltContext.Provider>
  );
}

export function useBelt() {
  const ctx = useContext(BeltContext);
  if (!ctx) throw new Error('useBelt must be used within BeltProvider');
  return ctx;
}
