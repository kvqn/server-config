import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { type Metadata } from "next"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} font-geist-sans`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
