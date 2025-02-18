import type React from "react"
import { Inter_Tight } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
})

export const metadata: Metadata = {
  title: "Brent - Product Designer",
  description: "Portfolio of Brent, a Product Designer with 8 years of experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${interTight.variable}`}>
      <body className="font-inter-tight bg-25 text-[#0E0E0E] dark:bg-[#121212] dark:text-[#FCFCFC]">
        <Navbar />
        {children}
      </body>
    </html>
  )
}



import './globals.css'