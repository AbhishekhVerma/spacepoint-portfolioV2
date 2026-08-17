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

      // Rocket transition animation
      gsap.fromTo(".rocket-transition",
        { 
          y: 100, 
          x: 0,
          opacity: 0,
          scale: 0.5
        },
        {
          y: -1200, // Blasts off upwards
          x: 200,   // Slight curve right
          opacity: 1,
          scale: 1.5,
          duration: 1.5,
          ease: "power4.in",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 90%", // Trigger right before the section fully leaves viewport
            toggleActions: "play none none reverse",
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
        
        {/* Left Side: Header & Profile */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="font-mono text-[var(--accent-telemetry-orange)] text-sm mb-4 tracking-widest uppercase about-text">
            // PROFILE_INITIALIZATION
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.85] text-[var(--foreground)] mb-6 about-text">
            SYSTEM<br/>
            <span className="text-[var(--gray-light)]">OVERVIEW</span>
          </h2>
          <div className="w-24 h-2 bg-[var(--accent-neon-red)] mt-2 mb-12 about-text"></div>
          
          {/* Profile Image */}
          <div className="w-full max-w-[300px] aspect-square border-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--gray-dark)] about-text">
            <img src="/img/profile.jpg" alt="Operator Profile" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            <div className="absolute bottom-4 left-4 bg-[var(--background)] border border-[var(--gray-light)] px-3 py-1 font-mono text-[10px] md:text-xs text-[var(--foreground)] z-10">
              &gt; OPERATOR_FEED
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-12">
          
          {/* Abstract block */}
          <div className="about-text border-l-4 border-[var(--gray-light)] pl-6">
            <h3 className="font-mono text-[var(--foreground)] text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">&gt; THE_OPERATOR</h3>
            <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
              A multidisciplinary 3rd‑year Computer Science student focused on data workflows, automation, and software development with applied artificial intelligence. Built backend systems, web applications, and AI-enabled tools through internships, projects, and winning hackathons. Strong foundation in object-oriented programming, databases, and scalable software design, with a keen interest in learning new tools and contributing to production-grade full-stack systems alongside bridging the gap between complex hardware systems and reliable software.
            </p>
          </div>

          {/* Projects / Internships block */}
          <div className="about-text border-l-4 border-[var(--accent-telemetry-orange)] pl-6 bg-gradient-to-r from-[var(--accent-telemetry-orange)]/10 to-transparent py-4 pr-4">
            <h3 className="font-mono text-[var(--accent-telemetry-orange)] text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">&gt; MISSION_LOG</h3>
            <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
              My engineering portfolio highlights practical deployments across the aerospace and AI stack. I've designed and validated Int8 quantized CNN architectures for real-time edge terrain classification, engineered decentralized RF mesh networks for resilient LEO satellite communications, and constructed high-gain ground station uplinks for telemetry interception in hostile urban environments. Alongside building live telemetry analytics dashboards, I also actively train the next generation of engineers through intensive STEM workshops.
            </p>
          </div>
          
        </div>
      </div>

      {/* Rocket Transition Element */}
      <div className="rocket-transition absolute right-8 md:right-32 -bottom-24 z-50 text-[var(--accent-neon-red)] -rotate-45 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      </div>

    </section>
  );
}
