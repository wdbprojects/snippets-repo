import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/components/shared/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Snippet App",
  description: "Save all your code snippets in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          montserrat.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-between p-12">
            {children}
          </main>
          <Toaster
            position="bottom-right"
            expand={true}
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
