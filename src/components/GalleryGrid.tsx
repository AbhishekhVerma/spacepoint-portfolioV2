"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryGrid({ galleryData }: { galleryData?: any }) {
  const img1 = galleryData?.img1 || "/img/5.png";
  const caption1 = galleryData?.caption1 || "Musuem of the Future Workshop (FHSC)";
  const img2 = galleryData?.img2 || "/img/6.png";
  const caption2 = galleryData?.caption2 || "Future Heroes Summer Camp (FHSC)";
  const img3 = galleryData?.img3 || "/img/7.png";
  const caption3 = galleryData?.caption3 || "CUBESAT";
  const img4 = galleryData?.img4 || "/img/8.png";
  const caption4 = galleryData?.caption4 || "Emirates Development Bank Quick Flight Workshop Instructor";

  const containerRef = useRef<HTMLElement>(null);
  // Array to hold references to the individual image cards for staggering
  const imagesRef = useRef<HTMLDivElement[]>([]);
  imagesRef.current = []; // Reset on every render before populating

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current || imagesRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      // Staggered reveal animation
      gsap.fromTo(imagesRef.current,
        { 
          opacity: 0, 
          scale: 0.95 
        },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8,
          stagger: 0.2, // 0.2 seconds between each image animating in
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // Starts when the top of the section hits 75% down the viewport
            // toggleActions: "play none none reverse" // Uncomment to replay animation when scrolling up
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[var(--background)] px-6 md:px-16 py-32 border-t-2 border-[var(--gray-light)] relative">
      
      {/* Massive Brutalist Header */}
      <h2 className="font-heading text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-normal leading-[0.8] text-[var(--foreground)] mb-16 break-words">
        THE<br/>
        INSTRUCTOR<br/>
        <span className="text-[var(--accent-telemetry-orange)]">ROLE</span>
      </h2>
      
      {/* Small contextual sub-header */}
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-8 h-8 bg-[var(--foreground)] flex items-center justify-center font-mono text-[var(--background)] font-bold"></div>
        <p className="font-mono text-[var(--gray-light)] uppercase tracking-widest text-sm">
          // Museum of the Future || Middlesex University || EBD Quick Flight Workshops
        </p>
      </div>

      {/* Asymmetrical CSS Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        {/* Placeholder 1: Massive Lead Image (Span 8) */}
        <div 
          ref={addToRefs} 
          className="col-span-1 md:col-span-8 h-72 md:h-[500px] border-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--gray-dark)]"
        >
          <img src={img1} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Gallery Image 1" />
          <div className="absolute bottom-4 left-4 bg-[var(--background)] border border-[var(--gray-light)] px-3 py-1 font-mono text-[10px] md:text-xs text-[var(--foreground)] z-10">
            &gt; IMG_01: {caption1}
          </div>
        </div>

        {/* Placeholder 2: Tall Portrait Image (Span 4) */}
        <div 
          ref={addToRefs} 
          className="col-span-1 md:col-span-4 h-72 md:h-[500px] border-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--gray-dark)]"
        >
          <img src={img2} className="absolute inset-0 w-full h-full object-cover object-left group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Gallery Image 2" />
          <div className="absolute bottom-4 left-4 bg-[var(--background)] border border-[var(--gray-light)] px-3 py-1 font-mono text-[10px] md:text-xs text-[var(--foreground)] z-10">
            &gt; IMG_02: {caption2}
          </div>
        </div>

        {/* Placeholder 3: Square-ish Image (Span 4) */}
        <div 
          ref={addToRefs} 
          className="col-span-1 md:col-span-4 h-64 md:h-96 border-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--gray-dark)]"
        >
          <img src={img3} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Gallery Image 3" />
          <div className="absolute bottom-4 left-4 bg-[var(--background)] border border-[var(--gray-light)] px-3 py-1 font-mono text-[10px] md:text-xs text-[var(--foreground)] z-10">
            &gt; IMG_03: {caption3}
          </div>
        </div>

        {/* Placeholder 4: Medium Landscape Image (Span 5) */}
        <div 
          ref={addToRefs} 
          className="col-span-1 md:col-span-5 h-64 md:h-96 border-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--gray-dark)]"
        >
          <img src={img4} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Gallery Image 4" />
          <div className="absolute bottom-4 left-4 bg-[var(--background)] border border-[var(--gray-light)] px-3 py-1 font-mono text-[10px] md:text-xs text-[var(--foreground)] z-10">
            &gt; IMG_04: {caption4}
          </div>
        </div>

        {/* Placeholder 5: Small Square (Span 3) */}
        <div 
          ref={addToRefs} 
          className="col-span-1 md:col-span-3 h-64 md:h-96 border-4 border-[var(--accent-telemetry-orange)] bg-[#0a0a0a] relative overflow-hidden group flex items-center justify-center shadow-[8px_8px_0px_0px_var(--accent-telemetry-orange)]"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>
          <div className="text-center font-mono z-10 p-4 flex flex-col items-center justify-center h-full">
             <div className="mb-6">
               <div className="text-[var(--accent-telemetry-orange)] text-4xl md:text-5xl mb-1 font-bold">3+</div>
               <div className="text-[var(--foreground)] text-xs md:text-sm uppercase tracking-widest">Workshops<br/>Lead/Assisted In</div>
             </div>
             <div>
               <div className="text-[var(--accent-telemetry-orange)] text-4xl md:text-5xl mb-1 font-bold">30+</div>
               <div className="text-[var(--foreground)] text-xs md:text-sm uppercase tracking-widest">Students<br/>Trained</div>
             </div>
          </div>
        </div>

      </div>

    </section>
  );
}
