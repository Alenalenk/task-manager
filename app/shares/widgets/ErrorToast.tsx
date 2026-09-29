'use client'
import { useError } from "@/app/context/ErrorContext";
import { Toast, ToastToggle } from "flowbite-react";
import { useEffect, useState } from "react";

export const ErrorToast = () => {
    const { error, setError } = useError();

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [error, setError]);

    return (
        <div className="fixed bottom-5 right-5 z-50">

            {error && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    </div>
                    <div className="ml-3 text-sm font-normal">{error}</div>
                    <ToastToggle />
                </Toast>
            )}
        </div>
    )
}