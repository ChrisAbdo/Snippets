import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

import { AuthProvider } from "@/lib/auth-provider";
import { ThemeProvider } from "@/lib/theme-provider";

import { GeistSans } from "geist/font";
import { Container } from "@/components/layout/container";
import { Toaster } from "sonner";
import Footer from "@/components/layout/footer";

const title = "Snippets - Manage your code snippets with ease.";
const description =
  "Snippets is a code snippet manager that allows you to create, share, and explore code snippets.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@abdo_eth",
  },
  metadataBase: new URL("https://code-snippets.vercel.app/"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <AuthProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Container>{children}</Container>
            {/* div wrapping the footer so that its at bottom of page */}
            <div className="fixed w-full bottom-0">
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
