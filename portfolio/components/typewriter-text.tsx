"use client"

import { useState, useEffect, useCallback } from "react"

interface TypewriterTextProps {
  staticText?: string
  typingText?: string
  linkText?: string
  linkURL?: string
}

const TypewriterText = ({
  staticText = "I'm Brent, a Product Designer with 8 years of experience designing digital products for enterprises and startups.",
  typingText = "Currently crafting products at Allergan Aesthetics.",
  linkText = "Allergan Aesthetics",
  linkURL = "https://www.allerganaesthetics.com",
}: TypewriterTextProps) => {
  const [fontSize, setFontSize] = useState(48)
  const [displayText, setDisplayText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  const words = typingText.split(" ")
  const chars = "0123456789!@#$%^&*()"

  // Handle cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Handle responsive font size
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 600) {
        setFontSize(24)
      } else if (window.innerWidth < 1024) {
        setFontSize(36)
      } else {
        setFontSize(48)
      }
    }

    updateFontSize()
    window.addEventListener("resize", updateFontSize)
    return () => window.removeEventListener("resize", updateFontSize)
  }, [])

  const scrambleWord = useCallback((word: string) => {
    return word
      .split("")
      .map((char) => (Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char))
      .join("")
  }, [])

  // Improved word-by-word scramble effect
  useEffect(() => {
    if (!isAnimating) return

    let currentWordIndex = 0
    let scrambleCount = 0
    const maxScrambles = 10
    const scrambleDelay = 50
    const wordDelay = 200

    const animate = () => {
      if (currentWordIndex >= words.length) {
        setIsAnimating(false)
        return
      }

      const currentWord = words[currentWordIndex]
      const previousWords = words.slice(0, currentWordIndex).join(" ")

      if (scrambleCount < maxScrambles) {
        // Scramble phase
        const scrambledWord = scrambleWord(currentWord)
        setDisplayText(`${previousWords}${previousWords ? " " : ""}${scrambledWord}`)
        scrambleCount++
        setTimeout(animate, scrambleDelay)
      } else {
        // Reveal phase
        setDisplayText(`${previousWords}${previousWords ? " " : ""}${currentWord}`)
        currentWordIndex++
        scrambleCount = 0
        setTimeout(animate, wordDelay)
      }
    }

    const timeoutId = setTimeout(animate, 500)
    return () => clearTimeout(timeoutId)
  }, [words, isAnimating, scrambleWord])

  const renderTextWithLink = () => {
    if (!displayText) return ""

    const parts = displayText.split(linkText)
    if (parts.length === 1) return displayText

    return (
      <>
        {parts[0]}
        <a
          href={linkURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-600 hover:text-[#F45A1A] transition-colors duration-200"
        >
          {linkText}
        </a>
        {parts[1]}
      </>
    )
  }

  return (
    <h1 className="font-inter-tight font-normal leading-tight w-full">
      <span className="text-text dark:text-25">{staticText} </span>
      <span className="text-600">
        {renderTextWithLink()}
        <span
          className="inline-block align-middle ml-1 bg-600"
          style={{
            width: "2px",
            height: `${fontSize}px`,
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </span>
    </h1>
  )
}

export default TypewriterText

