import type { Metadata } from "next";
import "./globals.css";
import { createTheme, ThemeModeScript, ThemeProvider } from "flowbite-react";
import { Header } from "@/app/shares/widgets/Header";


export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager - manage your tasks and projects efficiently",
};

const customTheme = createTheme({
  button: {
    base: "group relative flex items-center justify-center focus:outline-none",
    color: {
      primary: "bg-yellow-200 hover:bg-yellow-300",
      secondary: "bg-orange-300 hover:bg-orange-400",
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
    <ThemeProvider theme={customTheme} >
      <html suppressHydrationWarning>
        <head>
          <ThemeModeScript />
        </head>
        <body className="min-h-screen pt-10" >
          <Header />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
