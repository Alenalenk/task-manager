'use client'
import React, { Dispatch, useContext, useMemo, useState } from 'react';


type ErrorContextType = {
  error: string | null,
  setError: Dispatch<React.SetStateAction<string | null>>
};

export const ErrorContext = React.createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      error,
      setError
    }),
    [
        error,
        setError
    ],
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used inside ErrorProvider");
  }

  return context;
}