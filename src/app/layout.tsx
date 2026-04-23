import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Geist, Geist_Mono , Pixelify_Sans} from "next/font/google";
import { siteConfig } from "@/config/site";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ProfileHeader } from "@/components/sections/profile-header";
import type { Viewport } from "next"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase : new URL("https://prasan.tech"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords:[
    "Prasan Raj",
    "prasan raj",
    "prasan raj portfolio",
    "prasan raj github",
    "raj-prasan github",
    "raj-prasan",
    "prasan",
    "prasan tezpur university",
    "prasan full stack developer",
    "software developer"
  ],
  authors:[
    {
      name: "Prasan Raj",
      url: "https://prasan.tech"
    }
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  icons:{
    icon: "/prasan.svg"
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
          pixelifySans.variable
        )}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="prasan-theme"
        >
          <div className="mx-auto mb-16 w-full max-w-screen-sm py-8">
            <div className="items-center gap-8 container py-3 md:py-4 space-y-12">
              <ProfileHeader isActive={false}/>
            </div>
            
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
