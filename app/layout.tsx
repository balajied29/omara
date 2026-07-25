import type { Metadata } from "next";
import { Jost, Inter, Marcellus } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Omara — Modern Indian Dining at Hotel Palacio",
  description:
    "Omara is a modern Indian dining room at Hotel Palacio, created in collaboration with Chef Vicky Ratnani. Fire, craft and memory on every plate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${inter.variable} ${marcellus.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
