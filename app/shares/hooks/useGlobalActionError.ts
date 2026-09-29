import { useError } from "@/app/context/ErrorContext";
import { useEffect } from "react";

export function useGlobalActionError(error?: string | null) {
  const { setError } = useError();

  useEffect(() => {
    if (error) {
      setError(error);
  }
  }, [error, setError]);
}