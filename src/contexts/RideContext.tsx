import { createContext, useState } from 'react';
import { Tricycle } from '../types';

type RideContextType = {
  tricycleDetails: Tricycle | null;
  setTricycleDetails: (args: Tricycle | null) => void;
};

export const RideContext = createContext<RideContextType | undefined>(undefined);

export function RideProvider({ children }: { children: React.ReactNode }) {
  const [tricycleDetails, setTricycleDetails] = useState<Tricycle | null>(null);

  return (
    <RideContext.Provider
      value={{
        tricycleDetails,
        setTricycleDetails,
      }}>
      {children}
    </RideContext.Provider>
  );
}
