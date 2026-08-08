"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate how far to move horizontally (total width of content minus one viewport width)
      const getScrollAmount = () => {
        const wrapperWidth = wrapperRef.current?.scrollWidth || 0;
        const viewportWidth = window.innerWidth;
        return -(wrapperWidth - viewportWidth);
      };

      const tween = gsap.to(wrapperRef.current, {
        x: getScrollAmount,
        ease: "none", // Linear ease is crucial for ScrollTrigger scrubbing
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${wrapperRef.current?.scrollWidth}`, // Scroll duration proportional to width
        pin: true,
        animation: tween,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate values on window resize
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-[var(--background)] overflow-hidden relative">
      {/* Decorative brutalist background grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,var(--gray-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-light)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div ref={wrapperRef} className="flex h-full w-max flex-nowrap items-center">
        
        {/* PANEL 1: MobileNetV2 & Quantization */}
        <div className="w-screen h-full flex-shrink-0 flex items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-7xl h-[75vh] flex flex-col md:flex-row border-4 border-[var(--gray-light)] bg-[var(--background)] relative shadow-[16px_16px_0px_0px_var(--gray-dark)]">
            {/* High-Contrast B&W Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full border-b-4 md:border-b-0 md:border-r-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group">
              {/* Inserted your custom image here: */}
              <img src="/img/1.png" className="absolute inset-0 w-full h-full object-cover contrast-125" alt="Neural Network Arch" />
              
              {/* Brutalist Label (kept intact) */}
              <div className="absolute top-4 left-4 bg-[var(--foreground)] text-[var(--background)] font-mono text-xs px-2 py-1 font-bold z-10">FIG 1.0_ARCH</div>
            </div>
            
            {/* Terminal Text Block */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-6 md:p-12 justify-center relative">
              <div className="font-mono text-[var(--accent-telemetry-orange)] text-sm md:text-base mb-6 border-b-2 border-[var(--gray-light)] pb-4 w-full">
                &gt; TARGET: INT8 QUANTIZATION<br/>
                &gt; MODEL: MobileNetV2
              </div>
              <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
                Deploying CNN architectures to the edge requires aggressive compression. By applying Int8 Quantization to the MobileNetV2 backbone, the model's memory footprint and inference latency are radically reduced without catastrophic degradation of accuracy. 
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 2: Hardware Constraints */}
        <div className="w-screen h-full flex-shrink-0 flex items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-7xl h-[75vh] flex flex-col md:flex-row border-4 border-[var(--gray-light)] bg-[var(--background)] relative shadow-[16px_16px_0px_0px_var(--gray-dark)]">
            <div className="w-full md:w-1/2 h-1/2 md:h-full border-b-4 md:border-b-0 md:border-r-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group">
              {/* Inserted your custom image 2 here (no greyscale): */}
              <img src="/img/2.png" className="absolute inset-0 w-full h-full object-cover" alt="STM32H7 Hardware" />
              
              <div className="absolute top-4 left-4 bg-[var(--foreground)] text-[var(--background)] font-mono text-xs px-2 py-1 font-bold z-10">FIG 2.0_HARDWARE</div>
            </div>
            
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-6 md:p-12 justify-center relative">
              <div className="font-mono text-[var(--accent-neon-red)] text-sm md:text-base mb-6 border-b-2 border-[var(--gray-light)] pb-4 w-full">
                &gt; TARGET_HARDWARE: STM32H7_NUCLEO<br/>
                &gt; CRITICAL_WARNING: MEMORY_LIMIT
              </div>
              <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
                The primary engineering bottleneck. The entire quantized model, alongside the RTOS and telemetry payload handlers, must fit within a strict <span className="bg-[var(--foreground)] text-[var(--background)] px-1 font-bold">1024 KB internal RAM constraint</span>. Memory allocation is manually managed to prevent heap fragmentation during orbital cycles.
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 3: Validation Matrix */}
        <div className="w-screen h-full flex-shrink-0 flex items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-7xl h-[75vh] flex flex-col md:flex-row border-4 border-[var(--gray-light)] bg-[var(--background)] relative shadow-[16px_16px_0px_0px_var(--gray-dark)]">
            <div className="w-full md:w-1/2 h-1/2 md:h-full border-b-4 md:border-b-0 md:border-r-4 border-[var(--gray-light)] bg-neutral-900 relative overflow-hidden group">
              {/* Inserted your custom image 3 here (no greyscale): */}
              <img src="/img/3.png" className="absolute inset-0 w-full h-full object-cover" alt="Confusion Matrix Validation" />
              
              <div className="absolute top-4 left-4 bg-[var(--foreground)] text-[var(--background)] font-mono text-xs px-2 py-1 font-bold z-10">FIG 3.0_VALIDATION</div>
            </div>
            
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col p-6 md:p-12 justify-center relative">
              <div className="font-mono text-[var(--foreground)] text-sm md:text-base mb-6 border-b-2 border-[var(--gray-light)] pb-4 w-full">
                &gt; PROTOCOL: INFERENCE_VALIDATION<br/>
                &gt; LATENCY: &lt; 15ms
              </div>
              <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-relaxed">
                Evaluating the Int8 model against the float32 baseline. The confusion matrix reveals a highly acceptable trade-off curve. Edge AI deployment successful. Real-time classification of terrain is now active directly on the Nucleo board at the edge without requiring a ground-station downlink.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
