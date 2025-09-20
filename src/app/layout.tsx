import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import { MusicProvider } from "@/lib/music-context";
import { MusicControls } from "@/components/music/MusicControls";
import { UserInteractionTracker } from "@/components/music/UserInteractionTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "秦基博 公式サイト",
  description: "シンガーソングライター秦基博の公式ウェブサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <MusicProvider>
            <UserInteractionTracker>
              {children}
              <MusicControls />
            </UserInteractionTracker>
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
