import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caestus Labs — Feel Virtual Reality",
  description: "An electrostatic clutch-based haptic suit for Meta Quest 3. Making virtual reality physical.",
  openGraph: {
    title: "Caestus Labs",
    description: "Making virtual reality physical.",
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caestus Labs',
    description: 'Making virtual reality physical.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
