import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TVB Intelligence Engine",
  description: "Founder intake and company intelligence profiles for TVB."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
