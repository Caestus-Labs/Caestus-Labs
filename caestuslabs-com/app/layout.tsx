import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caestus Labs",
  description: "Making virtual objects feel physically real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
