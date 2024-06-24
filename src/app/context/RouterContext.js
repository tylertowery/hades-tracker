'use client'

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

const RouterContext = createContext(null);

export const RouterProvider = ({ children }) => {
  const router = useRouter();
  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  )
}

export const useRouterContext = () => useContext(RouterContext);