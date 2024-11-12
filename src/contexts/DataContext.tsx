'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ChannelData } from '@/types/post';

interface DataContextType {
  data: ChannelData | null;
  setData: (data: ChannelData | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ChannelData | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
} 