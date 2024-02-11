import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import UserHeader from "@/components/logged-in-header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dummy API",
  description:
    "Power up your development process with customizable dummy data – Simplify. Accelerate. Innovate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const name = cookies().get("user-info")?.value || "";
  return (
    <html lang="en" suppressHydrationWarning className="transition-colors">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserHeader name={name} />
          <main>{children}</main>
          <Footer />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
