import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "../components/Layouts/Topbar/NavigationWrapper";
import Footer from "../components/Layouts/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://prepfrenchclasses.com"), // change to your real domain

  title: {
    default: "Prep French Classes | Online French Courses & TEF/TCF Preparation",
    template: "%s | Prep French Classes",
  },

  description:
    "Join Prep French Classes for structured online French courses from beginner to advanced levels. Expert training for TEF Canada, TCF Canada, and practical French fluency for career, academics, and immigration goals.",

  keywords: [
    "Online French classes",
    "Learn French online",
    "French for Canada PR",
    "TEF Canada preparation",
    "TCF Canada coaching",
    "French language course",
    "CRS score French",
    "Express Entry French",
    "French classes Canada",
  ],

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Prep French Classes | Online French Courses & Exam Preparation",
    description:
      "Structured French programs for beginners to advanced learners. Expert coaching for TEF & TCF Canada exams with flexible online batches.",
    url: "https://prepfrenchclasses.com",
    siteName: "Prep French Classes",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prep French Classes | Learn French with Confidence",
    description:
      "Online French courses with expert trainers. TEF & TCF preparation available.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavigationWrapper />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
