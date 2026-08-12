"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-text", 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[var(--background)] px-6 md:px-16 py-24 border-t-2 border-[var(--gray-light)] relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gray-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-light)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Side: Header */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="font-mono text-[var(--accent-telemetry-orange)] text-sm mb-4 tracking-widest uppercase about-text">
            // PROFILE_INITIALIZATION
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] text-[var(--foreground)] mb-6 about-text">
            SYSTEM<br/>
            <span className="text-[var(--gray-light)]">OVERVIEW</span>
          </h2>
          <div className="w-24 h-2 bg-[var(--accent-neon-red)] mt-2 about-text"></div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-12">
          
          {/* Abstract block */}
          <div className="about-text border-l-4 border-[var(--gray-light)] pl-6">
            <h3 className="font-mono text-[var(--foreground)] text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">&gt; THE_OPERATOR</h3>
            <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
              I am an Aerospace Engineering and Machine Learning specialist driven by the intersection of autonomous systems, embedded edge computing, and orbital telemetry. 
              My work focuses on bridging the gap between raw hardware constraints and high-level AI deployment, pushing complex neural networks out of the cloud and directly onto the edge.
            </p>
          </div>

          {/* Projects / Internships block */}
          <div className="about-text border-l-4 border-[var(--accent-telemetry-orange)] pl-6 bg-gradient-to-r from-[var(--accent-telemetry-orange)]/10 to-transparent py-4 pr-4">
            <h3 className="font-mono text-[var(--accent-telemetry-orange)] text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">&gt; MISSION_LOG</h3>
            <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
              My engineering portfolio spans multiple disciplines—from designing resilient mesh networks for nano-satellite swarms and executing Int8 quantized computer vision models on bare-metal microcontrollers, to architecting ground station uplinks. I thrive in high-noise, high-stakes environments where rigid hardware limitations demand radical algorithmic innovation.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
