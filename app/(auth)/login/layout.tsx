import { ThemeProvider } from "@/src/lib/components/theme-provider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex flex-col w-full gap-6">{children}</main>
    </ThemeProvider>
  );
}
