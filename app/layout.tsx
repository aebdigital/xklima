import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "X-Klima Slovakia | Klimatizácie a HVAC riešenia",
  description:
    "Klimatizácie, chladenie, vzduchotechnika, tepelné čerpadlá, montáž a servis pre domácnosti aj firmy."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
