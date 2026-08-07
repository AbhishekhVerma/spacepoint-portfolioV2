"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MeshNetwork() {
  const containerRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const label1Ref = useRef<SVGGElement>(null);
  const label2Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !path1Ref.current || !path2Ref.current) return;

    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    
    // Calculate exact lengths for the draw animation
    const len1 = path1.getTotalLength();
    const len2 = path2.getTotalLength();

    // Set initial dash arrays and offsets to hide the lines (via the SVG mask)
    gsap.set(path1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(path2, { strokeDasharray: len2, strokeDashoffset: len2 });
    gsap.set([label1Ref.current, label2Ref.current], { opacity: 0, scale: 0.8, transformOrigin: 'center center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5 viewport heights to allow drawing
          scrub: 1, 
          pin: true,
        }
      });

      // Draw the primary 868MHz link
      tl.to(path1, {
        strokeDashoffset: 0,
        ease: "power2.inOut",
        duration: 2,
      }, 0)
      // Pop in the primary label midway through drawing
      .to(label1Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, 1)
      
      // Draw the secondary 433MHz link slightly offset
      .to(path2, {
        strokeDashoffset: 0,
        ease: "power2.inOut",
        duration: 2,
      }, 0.5)
      // Pop in the secondary label midway through its drawing
      .to(label2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, 1.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[var(--background)] overflow-hidden flex items-center justify-center">
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      
      <svg viewBox="0 0 1200 800" className="w-full h-full max-h-screen relative z-10" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Orange Glow Filter */}
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Glow Filter */}
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Masks for animating the dashed and glowing lines without breaking their dasharrays */}
          <mask id="draw-mask-1">
            <path 
              ref={path1Ref}
              d="M 250 400 C 500 150, 700 250, 950 400" 
              stroke="white" 
              strokeWidth="20" 
              fill="none" 
            />
          </mask>
          <mask id="draw-mask-2">
            <path 
              ref={path2Ref}
              d="M 250 400 C 400 650, 700 600, 950 400" 
              stroke="white" 
              strokeWidth="20" 
              fill="none" 
            />
          </mask>
        </defs>

        {/* --- LINKS --- */}
        {/* 868MHz Telemetry Link (Solid Glowing Orange) */}
        <path 
          d="M 250 400 C 500 150, 700 250, 950 400" 
          stroke="var(--accent-telemetry-orange)" 
          strokeWidth="4" 
          fill="none" 
          filter="url(#glow-orange)"
          mask="url(#draw-mask-1)"
        />
        
        {/* 433MHz Telemetry Link (Dashed Glowing Red) */}
        <path 
          d="M 250 400 C 400 650, 700 600, 950 400" 
          stroke="var(--accent-neon-red)" 
          strokeWidth="3" 
          strokeDasharray="12 12"
          fill="none" 
          filter="url(#glow-red)"
          mask="url(#draw-mask-2)"
        />

        {/* --- NODE: SAT ALPHA --- */}
        <g transform="translate(250, 400)">
          {/* Target Reticles */}
          <circle cx="0" cy="0" r="80" fill="none" stroke="var(--gray-light)" strokeWidth="1" strokeDasharray="5 15" />
          <circle cx="0" cy="0" r="50" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeDasharray="10 5" />
          <line x1="-90" y1="0" x2="-60" y2="0" stroke="var(--gray-light)" strokeWidth="2" />
          <line x1="60" y1="0" x2="90" y2="0" stroke="var(--gray-light)" strokeWidth="2" />
          <line x1="0" y1="-90" x2="0" y2="-60" stroke="var(--gray-light)" strokeWidth="2" />
          <line x1="0" y1="60" x2="0" y2="90" stroke="var(--gray-light)" strokeWidth="2" />
          {/* Core Node */}
          <circle cx="0" cy="0" r="25" fill="var(--background)" stroke="var(--foreground)" strokeWidth="5" />
          <circle cx="0" cy="0" r="8" fill="var(--foreground)" />
          {/* Text Labels */}
          <text x="0" y="120" fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize="24" fontWeight="bold" textAnchor="middle">SAT_ALPHA</text>
          <text x="0" y="145" fill="var(--gray-light)" fontFamily="var(--font-mono)" fontSize="14" textAnchor="middle">ID: 0x00A1 | 550km LEO</text>
        </g>

        {/* --- NODE: SAT BETA --- */}
        <g transform="translate(950, 400)">
          {/* Target Reticles */}
          <circle cx="0" cy="0" r="90" fill="none" stroke="var(--gray-light)" strokeWidth="1" strokeDasharray="2 8" />
          <circle cx="0" cy="0" r="45" fill="none" stroke="var(--foreground)" strokeWidth="2" />
          {/* Diagonal Crosshairs */}
          <line x1="-70" y1="-70" x2="-40" y2="-40" stroke="var(--gray-light)" strokeWidth="2" />
          <line x1="40" y1="40" x2="70" y2="70" stroke="var(--gray-light)" strokeWidth="2" />
          {/* Core Node */}
          <circle cx="0" cy="0" r="25" fill="var(--background)" stroke="var(--foreground)" strokeWidth="5" />
          <circle cx="0" cy="0" r="8" fill="var(--accent-telemetry-orange)" />
          {/* Text Labels */}
          <text x="0" y="120" fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize="24" fontWeight="bold" textAnchor="middle">SAT_BETA</text>
          <text x="0" y="145" fill="var(--gray-light)" fontFamily="var(--font-mono)" fontSize="14" textAnchor="middle">ID: 0x00B2 | 555km LEO</text>
        </g>

        {/* --- CAPTIONS / TELEMETRY DATA LABELS --- */}
        <g ref={label1Ref} transform="translate(480, 150)">
          {/* Box behind text for contrast */}
          <rect x="0" y="0" width="260" height="65" fill="var(--background)" stroke="var(--accent-telemetry-orange)" strokeWidth="2" />
          {/* Brutalist corner notch (decorative) */}
          <polygon points="250,0 260,0 260,10" fill="var(--accent-telemetry-orange)" />
          <text x="15" y="25" fill="var(--accent-telemetry-orange)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">&gt; 868MHz PRI_LINK (ACTIVE)</text>
          <text x="15" y="45" fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize="12">TX: UART_PAYLOAD_DATA</text>
          <text x="15" y="58" fill="var(--gray-light)" fontFamily="var(--font-mono)" fontSize="10">BAUD: 115200 | ENCRYPT: AES-256</text>
        </g>

        <g ref={label2Ref} transform="translate(480, 600)">
          <rect x="0" y="0" width="260" height="65" fill="var(--background)" stroke="var(--accent-neon-red)" strokeWidth="2" />
          <polygon points="250,0 260,0 260,10" fill="var(--accent-neon-red)" />
          <text x="15" y="25" fill="var(--accent-neon-red)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">&gt; 433MHz SEC_LINK (STANDBY)</text>
          <text x="15" y="45" fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize="12">TX: Ground Station Link & OVERRIDE</text>
          <text x="15" y="58" fill="var(--gray-light)" fontFamily="var(--font-mono)" fontSize="10">STATUS: REDUNDANCY_ONLY</text>
        </g>

      </svg>
    </section>
  );
}
