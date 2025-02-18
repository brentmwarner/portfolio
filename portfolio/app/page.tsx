"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import TypewriterText from "@/components/typewriter-text"
import { Button } from "@/components/ui/button"
import ParticleSphere from "@/components/particle-sphere"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const workTitleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(workRef.current, {
        y: "100vh",
        borderTopLeftRadius: "28px",
        borderTopRightRadius: "28px",
      })

      // Create the slide-up animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          preventOverlaps: true,
          fastScrollEnd: true,
          snap: {
            snapTo: 1,
            duration: 0.6,
            delay: 0,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            // Enable content scrolling only when the animation is complete
            if (contentRef.current) {
              contentRef.current.style.pointerEvents = self.progress === 1 ? "auto" : "none"
            }
          },
        },
      })

      // Animate the work section sliding up and border radius
      tl.to(workRef.current, {
        y: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={mainRef} className="relative h-screen overflow-hidden touch-action-none">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="fixed top-0 left-0 w-full min-h-[calc(100vh-8rem)] flex flex-col justify-between px-4 md:px-8 lg:px-14 overflow-hidden touch-action-none"
        >
          <div className="mt-8">
            <TypewriterText
              staticText="I'm Brent, a Product Designer with 8 years of experience designing digital products for enterprises and startups."
              typingText="Currently crafting products at Allergan Aesthetics."
              linkText="Allergan Aesthetics"
              linkURL="https://www.allerganaesthetics.com"
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full h-[50vh] bg-[#282828] rounded-xl relative overflow-hidden mb-6">
              <div className="absolute inset-0">
                <ParticleSphere />
              </div>
            </div>
            <div className="text-right text-text dark:text-text-dark text-xs pb-4">New York, NY</div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section
          ref={workRef}
          className="fixed top-0 left-0 w-full min-h-screen bg-25 dark:bg-25-dark z-10 shadow-[inset_0px_27px_25px_16px_rgba(248,248,248,0.90)] dark:shadow-[inset_0px_27px_25px_16px_rgba(18,18,18,0.90)]"
        >
          <div className="h-screen flex flex-col items-center justify-center">
            <h2
              ref={workTitleRef}
              className="text-[12vw] md:text-[8vw] font-medium text-text dark:text-25 text-center leading-none"
            >
              Selected Work
            </h2>
          </div>
        </section>
      </main>

      {/* Scrollable Content */}
      <div ref={contentRef} className="relative bg-25 dark:bg-25-dark">
        {/* Work Grid */}
        <section className="px-4 md:px-8 lg:px-14 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-100 dark:bg-100-dark rounded-xl p-6 aspect-[4/3] relative hover:scale-[0.98] transition-transform duration-500"
              >
                <Image src="/placeholder.svg" alt={`Project ${item}`} fill className="object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="px-4 md:px-8 lg:px-14 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-24">
            <div>
              <h2 className="text-h2 font-medium">About</h2>
            </div>
            <div className="space-y-12">
              <p className="text-body-large">
                I'm Brent, a Product Designer with 8 years of experience designing digital products for enterprises and
                startups. Currently crafting products at Allergan Aesthetics
              </p>
              <p className="text-body-large">
                I'm Brent, a Product Designer with 8 years of experience designing digital products for enterprises and
                startups. Currently crafting products at Allergan Aesthetics
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="px-4 md:px-8 lg:px-14 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-24" style={{ marginTop: "128px" }}>
            <div className="border-t border-600 pt-10">
              <h3 className="text-h3 font-medium">Experience</h3>
            </div>
            <div className="border-t border-600 pt-10 space-y-16">
              {[
                {
                  company: "Allergan Aesthetics",
                  role: "Senior Product Designer",
                  date: "Jun 2022 - Present",
                  description: "Some text about what I do at Allergan.",
                },
                {
                  company: "Correlation One",
                  role: "Senior Product Designer",
                  date: "Jan 2022 - Jun 2022",
                  description: "Some text about what I do at Correlation One.",
                },
                {
                  company: "Atravo",
                  role: "Lead Product Designer",
                  date: "Aug 2020 - Jun 2022",
                  description: "Some text about what I do at Atravo.",
                },
                {
                  company: "Freelance Product Design",
                  role: "Product Designer",
                  date: "Sept 2017 - Aug 2020",
                  description: "Some text about what I do as Freelancer.",
                },
              ].map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-text dark:text-text-dark text-h4 font-medium">{job.company}</h4>
                    <p className="text-accent text-right">{job.date}</p>
                  </div>
                  <h4 className="text-600 mb-4 text-h4 font-normal">{job.role}</h4>
                  <p className="text-600">{job.description}</p>
                </div>
              ))}
              <div className="pt-8">
                <Button className="rounded-full h-[56px] px-4 py-4 bg-text dark:bg-text-dark text-25 dark:text-text hover:bg-accent font-medium">
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-24" style={{ marginTop: "128px" }}>
            <div className="border-t border-600 pt-10">
              <h3 className="text-h3 font-medium">Skillsets</h3>
            </div>
            <div className="border-t border-600 pt-10">
              <div className="flex flex-col gap-4">
                {[
                  "Product Design",
                  "User Experience Design",
                  "User Research",
                  "Design Strategy",
                  "Prototyping",
                  "Motion Design",
                ].map((skill, index) => (
                  <p key={index} className="text-xl">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 md:px-8 lg:px-14 mb-24">
          <h2 className="mb-8">Let's Connect!</h2>
          <div className="flex gap-4">
            <Link href="#" className="px-4 py-2 bg-text text-25 rounded-full hover:bg-accent transition-colors">
              Say Hello
            </Link>
            <Link href="#" className="px-4 py-2 border border-text rounded-full hover:bg-100 transition-colors">
              Resume
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 md:px-8 lg:px-14 pb-8 flex justify-between text-xs text-600">
          <p>© 2024 All Rights Reserved. Legal Information.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-accent">
              About
            </Link>
            <Link href="#" className="hover:text-accent">
              Resume
            </Link>
          </div>
        </footer>
      </div>
    </>
  )
}

