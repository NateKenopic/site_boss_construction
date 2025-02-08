import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HomeNavigationMenu } from "./components/home/home-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Site Boss Construction",
  description: "The Best Software Solutions for Construction Companies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeNavigationMenu />
        {children}
      </body>
    </html>
  );
}
