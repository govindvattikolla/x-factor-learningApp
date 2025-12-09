import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
    title: 'X-Factor | Personalized Learning & Career Acceleration',
    description: 'Join X-Factor to accelerate your career with personalized courses in AI, Soft Skills, and Resume Building. 100+ Satisfied Students.',
    keywords: ['Career Growth', 'AI Course', 'Soft Skills', 'Resume Building', 'Mentorship'],
    icons: {
        icon: '/XFactor_logo_transparent.png',
    },
    openGraph: {
        title: 'X-Factor Learning App',
        description: 'Only a student truly understands another student. Start your journey.',
        images: [
            {
                url: '/XFactor_logo_transparent.png',
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <StoreProvider> {children} </StoreProvider>
      </body>
    </html>
  );
}
