"use client"

import { useState, useEffect, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import gsap from "gsap"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    // Initialize GSAP context
    ctx.current = gsap.context(() => {}, menuRef)

    return () => {
      ctx.current?.revert()
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    if (!menuRef.current || !linksContainerRef.current) return

    if (isOpen) {
      // Reset initial states
      gsap.set(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
      })
      gsap.set(linksContainerRef.current.children, {
        y: 50,
        opacity: 0,
      })

      // Animate menu opening
      const tl = gsap.timeline()
      tl.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
        duration: 0.8,
        ease: "power3.inOut",
      }).to(
        linksContainerRef.current.children,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2",
      )
    }
  }, [isOpen])

  return (
    <nav className="sticky top-0 z-50 border-b border-25/35 bg-white/35 backdrop-blur-sm dark:border-950/35 dark:bg-950/35">
      <div className="flex items-center justify-between p-4 md:px-12">
        <svg width="54" height="25" viewBox="0 0 54 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_ddddii_1_1628)">
            <path
              d="M8.74 18.64C7.99333 18.64 7.34 18.48 6.78 18.16C6.23333 17.84 5.80667 17.3933 5.5 16.82L5.44 18.4H3V4.19999H5.56V9.23999C5.85333 8.74666 6.27333 8.33333 6.82 7.99999C7.36667 7.65333 8.00667 7.47999 8.74 7.47999C9.66 7.47999 10.4533 7.71333 11.12 8.17999C11.8 8.63333 12.32 9.27999 12.68 10.12C13.0533 10.9467 13.24 11.9267 13.24 13.06C13.24 14.1933 13.0533 15.18 12.68 16.02C12.32 16.8467 11.8 17.4933 11.12 17.96C10.4533 18.4133 9.66 18.64 8.74 18.64ZM8.16 16.56C8.89333 16.56 9.48 16.2533 9.92 15.64C10.36 15.0133 10.58 14.1533 10.58 13.06C10.58 11.9533 10.36 11.0933 9.92 10.48C9.49333 9.86666 8.91333 9.55999 8.18 9.55999C7.63333 9.55999 7.16 9.69999 6.76 9.97999C6.37333 10.2467 6.07333 10.64 5.86 11.16C5.66 11.68 5.56 12.3133 5.56 13.06C5.56 13.78 5.66 14.4067 5.86 14.94C6.07333 15.46 6.37333 15.86 6.76 16.14C7.14667 16.42 7.61333 16.56 8.16 16.56Z"
              fill="white"
              className="dark:fill-25"
            />
            <path
              d="M14.3066 20.6L20.2266 3.39999H22.7466L16.8266 20.6H14.3066Z"
              fill="white"
              className="dark:fill-25"
            />
            <path
              d="M22.0167 20.6L27.9367 3.39999H30.4567L24.5367 20.6H22.0167Z"
              fill="white"
              className="dark:fill-25"
            />
            <path
              d="M34.0541 18.4L30.8341 7.71999H33.4541L35.5341 15.5L37.6741 7.71999H39.9141L42.0741 15.5L44.1541 7.71999H46.7741L43.5541 18.4H40.9141L38.7941 11.24L36.6941 18.4H34.0541Z"
              fill="white"
              className="dark:fill-25"
            />
            <path d="M46.6972 18.4V15.6H49.6172V18.4H46.6972Z" fill="white" className="dark:fill-25" />
          </g>
          <defs>
            <filter
              id="filter0_ddddii_1_1628"
              x="0"
              y="0.399994"
              width="53.6172"
              height="24.2"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.9 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1628" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_1_1628" result="effect2_dropShadow_1_1628" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="-1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.2 0" />
              <feBlend mode="normal" in2="effect2_dropShadow_1_1628" result="effect3_dropShadow_1_1628" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-1" dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.2 0" />
              <feBlend mode="normal" in2="effect3_dropShadow_1_1628" result="effect4_dropShadow_1_1628" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_1_1628" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="shape" result="effect5_innerShadow_1_1628" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="effect5_innerShadow_1_1628" result="effect6_innerShadow_1_1628" />
            </filter>
          </defs>
        </svg>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="rounded-full p-2 dark:text-white" aria-label="Toggle theme">
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="flex flex-col gap-1.5 p-2 hover:bg-100 dark:hover:bg-800 rounded-full"
                aria-label="Menu"
              >
                <span className="w-6 h-0.5 bg-text dark:bg-25 rounded-full" />
                <span className="w-6 h-0.5 bg-text dark:bg-25 rounded-full" />
                <span className="w-6 h-0.5 bg-text dark:bg-25 rounded-full" />
              </button>
            </SheetTrigger>
            <SheetContent
              ref={menuRef}
              className="!fixed !inset-0 !w-full !h-full !border-none !rounded-none !shadow-none !p-0"
              style={{
                clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                backgroundColor: "var(--color-50)",
              }}
            >
              <nav ref={linksContainerRef} className="flex flex-col items-center justify-center h-full gap-8">
                {["Home", "Work", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-h2 font-medium text-text dark:text-25 hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

