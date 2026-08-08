"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. The main parallax effect on the image container
      gsap.fromTo(imageRef.current, 
        { yPercent: -15 },
        { 
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Trigger when the top of section hits the bottom of the viewport
            end: "bottom top",   // End when the bottom of section leaves the top of viewport
            scrub: true,         // Smooth scrubbing
          }
        }
      );

      // 2. Transition the SVG overlay: Fade it out and scale it up to reveal the photo underneath
      if (svgRef.current) {
        gsap.to(svgRef.current, {
          opacity: 0,
          scale: 1.5, // slightly zoom it towards the user as it fades
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center", // Start fading when the section reaches the middle of the screen
            end: "center center", // Fully faded out when the section is centered
            scrub: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[var(--background)] flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-24 overflow-hidden border-t border-[var(--gray-light)]">
      
      {/* Decorative vertical lines for brutalist grid */}
      <div className="absolute left-6 md:left-16 top-0 bottom-0 w-px bg-[var(--gray-light)] opacity-30"></div>
      <div className="absolute right-6 md:right-16 top-0 bottom-0 w-px bg-[var(--gray-light)] opacity-30"></div>

      {/* --- LEFT: Parallax Image Container --- */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative overflow-hidden border-4 border-[var(--gray-light)] z-10 shadow-[16px_16px_0px_0px_var(--gray-dark)]">
        
        {/* The target for the GSAP parallax tween. It is 130% height to prevent edge clipping. */}
        <div 
          ref={imageRef}
          className="absolute top-[-15%] left-0 w-full h-[130%] bg-neutral-900 flex flex-col items-center justify-center grayscale contrast-[1.2]"
        >
          {/* User's custom background photo */}
          <img src="/img/4.png" className="absolute inset-0 w-full h-full object-cover" alt="Ground Plane Antenna" />

          {/* SVG Overlay Transition */}
          <div ref={svgRef} className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 backdrop-blur-sm">
            <svg viewBox="0 0 300 500" className="w-48 md:w-64 h-auto opacity-100 relative z-10 drop-shadow-[0_0_10px_rgba(255,102,0,0.5)]">
               {/* Center Radiator */}
               <line x1="150" y1="100" x2="150" y2="400" stroke="var(--foreground)" strokeWidth="6" strokeLinecap="square" />
               {/* Ground Planes */}
               <line x1="150" y1="350" x2="30" y2="450" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="square" />
               <line x1="150" y1="350" x2="270" y2="450" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="square" />
               <line x1="150" y1="350" x2="90" y2="410" stroke="var(--foreground)" strokeWidth="3" strokeDasharray="6 6" />
               <line x1="150" y1="350" x2="210" y2="410" stroke="var(--foreground)" strokeWidth="3" strokeDasharray="6 6" />
               {/* N-Type Connector Base */}
               <rect x="135" y="340" width="30" height="40" fill="var(--background)" stroke="var(--foreground)" strokeWidth="4" />
            </svg>
          </div>

          {/* Noise overlay (Base64 inline SVG) */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNyIvPjwvc3ZnPg==')] pointer-events-none opacity-50 z-20"></div>
          
          {/* Brutalist image tag */}
          <div className="absolute bottom-4 left-4 bg-[var(--background)] px-3 py-1 border-2 border-[var(--gray-light)] z-30">
             <span className="font-mono text-xs md:text-sm text-[var(--accent-telemetry-orange)] font-bold">IMG_04 // GROUND_PLANE_ANTENNA</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT: Typography & Hardware Build Details --- */}
      <div className="w-full lg:w-1/2 mt-16 lg:mt-0 lg:pl-16 flex flex-col justify-center relative z-10">
        <h2 className="font-heading text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-normal leading-[0.85] text-[var(--foreground)] mb-10">
          GROUND<br/>
          STATION<br/>
          <span className="text-[var(--accent-telemetry-orange)]">UPLINK</span>
        </h2>
        
        {/* Context Paragraph */}
        <div className="border-l-4 border-[var(--accent-telemetry-orange)] pl-6 py-1 mb-10">
          <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
            Constructing a high-gain, omnidirectional 1/4 wave ground plane antenna designed to intercept fragmented CubeSat telemetry packets across hostile, high-noise urban RF environments.
          </p>
        </div>

        {/* Technical Specs List */}
        <ul className="font-mono text-[var(--foreground)] text-sm md:text-base space-y-6 flex flex-col">
          <li className="flex flex-col md:flex-row md:items-start group">
             <span className="text-[var(--accent-telemetry-orange)] mr-4 font-bold hidden md:block opacity-50 group-hover:opacity-100 transition-opacity">[{'>'}]</span>
             <div>
               <span className="text-[var(--foreground)] font-bold bg-[var(--gray-light)] text-[var(--background)] px-1 mr-2 inline-block mb-1 md:mb-0">14 AWG SOLID COPPER WIRE</span> 
               Tuned precisely to the 433MHz resonance frequency to maximize the signal-to-noise ratio during orbital passes.
             </div>
          </li>
          <li className="flex flex-col md:flex-row md:items-start group">
             <span className="text-[var(--accent-telemetry-orange)] mr-4 font-bold hidden md:block opacity-50 group-hover:opacity-100 transition-opacity">[{'>'}]</span>
             <div>
               <span className="text-[var(--foreground)] font-bold bg-[var(--gray-light)] text-[var(--background)] px-1 mr-2 inline-block mb-1 md:mb-0">TEFLON CORE N-TYPE CONNECTOR</span> 
               High-power, ultra-low-loss RF interfacing mitigating dialectric breakdown at the crucial feed point.
             </div>
          </li>
          <li className="flex flex-col md:flex-row md:items-start group">
             <span className="text-[var(--accent-telemetry-orange)] mr-4 font-bold hidden md:block opacity-50 group-hover:opacity-100 transition-opacity">[{'>'}]</span>
             <div>
               <span className="text-[var(--foreground)] font-bold bg-[var(--gray-light)] text-[var(--background)] px-1 mr-2 inline-block mb-1 md:mb-0">50-OHM IMPEDANCE TUNING</span> 
               Eliminating Voltage Standing Wave Ratio (VSWR) reflections to ensure pristine payload packet decoding.
             </div>
          </li>
        </ul>
      </div>

    </section>
  );
}
