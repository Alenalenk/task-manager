import type { Metadata } from "next";
import "./globals.css";
import { createTheme, ThemeModeScript, ThemeProvider } from "flowbite-react";
import { Header } from "@/app/shares/widgets/Header";
import { ErrorToast } from "@/app/shares/widgets/ErrorToast";
import { ErrorProvider } from "./context/ErrorContext";


export const metadata: Metadata = {
  title: "Головна | Task Manager",
  description: "Task Manager - керуй ефективністю своїї проєктів",
};

const customTheme = createTheme({
  button: {
    base: "group relative flex items-center justify-center focus:outline-none",
    color: {
      primary: "bg-orange-300 hover:bg-orange-400",
      secondary: "bg-gray-200 hover:bg-gray-300"
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning>
      <ThemeProvider theme={customTheme} >
        <ErrorProvider>

          <body className="min-h-screen pt-10" >
            <Header />
            {children}
            <ErrorToast />
          </body>

        </ErrorProvider>
      </ThemeProvider>
    </html>
  );
}
