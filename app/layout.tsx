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
    "Omara is a modern Indian dining room on the 4th floor of Hotel Palacio, Guwahati, created in collaboration with Chef Vicky Ratnani. Fire, craft and memory on every plate.",
};

/** Name/address/phone in machine-readable form — this is what search
    engines and maps read for local listings. */
const RESTAURANT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Omara",
  servesCuisine: "Modern Indian",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4th floor, Hotel Palacio, HP Brahmachari Road, Paltan Bazaar",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    postalCode: "781008",
    addressCountry: "IN",
  },
  telephone: "+91-91270-00120",
  sameAs: ["https://www.instagram.com/omara.ghy/"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(RESTAURANT_SCHEMA),
          }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
