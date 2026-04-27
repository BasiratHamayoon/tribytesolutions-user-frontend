import "./globals.css";
import { Space_Grotesk, Outfit, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "TriByte Solutions - IT Software Services & Digital Solutions",
  description:
    "TriByte Solutions is a premier IT software services company offering custom software development, cloud solutions, AI/ML, mobile apps, and digital transformation services.",
  keywords:
    "IT services, software development, web development, mobile apps, cloud solutions, AI, machine learning, DevOps, TriByte Solutions",
  authors: [{ name: "TriByte Solutions" }],
  openGraph: {
    title: "TriByte Solutions - IT Software Services & Digital Solutions",
    description:
      "Transform your business with cutting-edge technology solutions from TriByte Solutions.",
    url: "https://tribytesolutions.com",
    siteName: "TriByte Solutions",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}
    >
      {/* suppressHydrationWarning on body prevents the script tag warning */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}