"use client";
import "./globals.css";
import { SidebarProvider } from "@/src/lib/components/ui/sidebar";
import { AppSidebar } from "@/src/lib/components/app-sidebar";
import { ThemeProvider } from "@/src/lib/components/theme-provider";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/src/lib/components/personal/Breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body className={`antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <main className="flex flex-col m-10 w-full gap-6">
                <Breadcrumb />
                {children}
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }
}
