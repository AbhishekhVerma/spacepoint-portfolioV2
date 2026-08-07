"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !textRef.current) return;

    // Use GSAP context for safe cleanup in React 18+ strict mode
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Pins the section for 2.5x viewport height to allow time to scroll
          scrub: 1.5, // 1.5 second lag for ultra-smooth scrubbing
          pin: true,
        }
      });

      // 1. Zoom through the text massively
      tl.to(titleRef.current, {
        scale: 80, // Massive brutalist scale
        opacity: 0,
        duration: 3,
        ease: "power2.in",
      })
      // 2. Reveal the monospaced terminal text behind it
      .fromTo(textRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1.5"); // Start fading in before the zoom completes
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--background)]"
    >
      {/* Background Layer: Terminal Paragraph */}
      <div 
        ref={textRef}
        className="absolute z-10 w-full max-w-3xl px-6 flex flex-col opacity-0"
      >
        <p className="font-mono text-left text-[var(--gray-light)] uppercase text-xs md:text-sm tracking-widest border-b-[1px] border-[var(--gray-light)] pb-2 mb-4">
          sys.log // Practice School-I
        </p>
        <p className="font-mono text-left text-[var(--foreground)] text-sm md:text-base leading-relaxed tracking-tight">
          &gt; INITIATING_UPLINK: SPACEPOINT_UAE<br/>
          &gt; PROJECT: CUBESAT_SWARM_TELEMETRY<br/>
          &gt; DEPLOYMENT: LEO (LOW EARTH ORBIT)<br/>
          <br/>
          Architecting resilient, decentralized mesh networks for nano-satellites. Integrating onboard Edge AI for autonomous orbital decision-making, minimizing ground-station latency, and ensuring continuous high-fidelity telemetry streaming.
        </p>
      </div>

      {/* Foreground Layer: Massive Title */}
      <h1 
        ref={titleRef}
        className="absolute z-20 text-center font-heading text-[12vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tight"
        style={{ transformOrigin: "center center" }}
      >
        <span className="block text-[var(--foreground)]">CUBESAT MESH</span>
        <span className="block text-[var(--foreground)]">
          & <span className="text-[var(--accent-neon-red)]">EDGE AI</span>
        </span>
      </h1>
    </section>
  );
}
