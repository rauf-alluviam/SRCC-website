import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientLayout from "./ClientLayout";

// import CustomCursorWrapper from "./components/CustomCursorWrapper";
// import WhatsAppChatWrapper from "./components/WhatsAppChatWrapper"; 
import 'leaflet/dist/leaflet.css';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SR CONTAINER CARRIERS",
  description:
    "Gujarat-based logistics company specializing in containerized, OEM, and air cargo transportation",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
   <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
  <body className="antialiased" suppressHydrationWarning>
    <Header />
    <ClientLayout>{children}</ClientLayout>
    <Footer />
  </body>
</html>

  );
}
