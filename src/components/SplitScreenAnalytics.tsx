"use client";

import React from 'react';

export default function SplitScreenAnalytics() {
  return (
    <section className="relative w-full bg-[#111111] flex flex-col lg:flex-row border-t-2 border-[var(--gray-light)]">
      
      {/* --- LEFT COLUMN: Sticky 60% Width --- */}
      <div className="w-full lg:w-[60%] lg:sticky lg:top-0 h-[60vh] lg:h-screen border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--gray-light)] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        {/* Subtle grid background to match technical aesthetic */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>

        {/* GRAFANA MISSION CONTROL DASHBOARD PLACEHOLDER */}
        <div className="w-full h-full max-h-[800px] border-4 border-[var(--gray-light)] bg-[var(--background)] flex flex-col relative shadow-[16px_16px_0px_0px_var(--gray-dark)] z-10">
          
          {/* Dashboard Header Bar */}
          <div className="w-full h-12 border-b-4 border-[var(--gray-light)] flex items-center justify-between px-4 bg-[#111111]">
            <div className="font-mono text-[var(--foreground)] text-sm font-bold flex items-center">
              <span className="w-3 h-3 bg-[var(--accent-telemetry-orange)] mr-3"></span>
              GRAFANA // MISSION_CONTROL
            </div>
            <div className="flex space-x-2">
              <div className="w-4 h-4 border border-[var(--gray-light)]"></div>
              <div className="w-4 h-4 border border-[var(--gray-light)]"></div>
              <div className="w-4 h-4 bg-[var(--foreground)]"></div>
            </div>
          </div>
          
          {/* Dashboard Grid Content */}
          <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">
            
            {/* Primary Telemetry Chart */}
            <div className="col-span-2 row-span-2 border-2 border-[var(--gray-light)] bg-[#111111] p-4 relative overflow-hidden flex flex-col">
              <div className="font-mono text-[var(--gray-light)] text-xs md:text-sm mb-2 flex justify-between">
                <span>> TELEMETRY_FLUX (MS/S)</span>
                <span>LIVE_STREAM_ACTIVE</span>
              </div>
              
              {/* Dynamic SVG Line Chart Simulation */}
              <div className="flex-1 relative w-full mt-4">
                <svg className="absolute bottom-0 left-0 w-full h-[90%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Fill */}
                  <polyline points="0,100 10,80 20,85 30,50 40,60 50,20 60,30 70,10 80,40 90,15 100,50 100,100" fill="rgba(255,102,0,0.1)" />
                  {/* Stroke */}
                  <polyline points="0,100 10,80 20,85 30,50 40,60 50,20 60,30 70,10 80,40 90,15 100,50" fill="none" stroke="var(--accent-telemetry-orange)" strokeWidth="2" strokeLinejoin="bevel" />
                </svg>
                
                {/* Horizontal target line */}
                <div className="absolute top-[40%] left-0 w-full border-t border-dashed border-[var(--gray-light)] opacity-50"></div>
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 bg-[var(--accent-neon-red)] text-white font-mono text-[10px] md:text-xs font-bold px-3 py-1 flex items-center border border-white shadow-[0_0_15px_rgba(255,51,51,0.5)] animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                WILDFIRE ALERT
              </div>
            </div>
            
            {/* Secondary Stat: Thermals */}
            <div className="col-span-1 row-span-1 border-2 border-[var(--gray-light)] bg-[#111111] p-4 flex flex-col justify-between">
              <div className="font-mono text-[var(--gray-light)] text-xs">> SYS_THERMALS</div>
              <div className="font-mono text-3xl md:text-5xl text-[var(--foreground)] font-bold tracking-tighter">42.8°C</div>
              <div className="self-start mt-2 border-2 border-[#00ff00] text-[#00ff00] font-mono text-[10px] md:text-xs font-bold px-2 py-0.5 bg-[#00ff00]/10">
                SAFE
              </div>
            </div>
            
            {/* Secondary Stat: Packet Loss */}
            <div className="col-span-1 row-span-1 border-2 border-[var(--gray-light)] bg-[#111111] p-4 flex flex-col justify-between">
              <div className="font-mono text-[var(--gray-light)] text-xs">> PACKET_LOSS</div>
              <div className="font-mono text-3xl md:text-5xl text-[var(--foreground)] font-bold tracking-tighter">0.03%</div>
              <div className="self-start mt-2 border-2 border-[#00ff00] text-[#00ff00] font-mono text-[10px] md:text-xs font-bold px-2 py-0.5 bg-[#00ff00]/10">
                SAFE
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: Scrollable 40% Width --- */}
      <div className="w-full lg:w-[40%] flex flex-col p-8 md:p-16 lg:py-[30vh] space-y-[20vh] bg-[#111111]">
        
        {/* TEXT BLOCK 1 */}
        <div className="flex flex-col relative">
          <div className="absolute -left-12 top-2 hidden lg:block text-[var(--gray-light)] font-mono text-sm opacity-50">01</div>
          <h3 className="font-mono text-[var(--accent-telemetry-orange)] text-xl md:text-2xl font-bold mb-6 border-b-2 border-[var(--gray-light)] pb-4 uppercase">
            &gt; Virtualization:<br/>Docker
          </h3>
          <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-loose">
            The entire ground station analytics stack is fully isolated and deployed via <span className="bg-[var(--foreground)] text-[var(--background)] px-1 font-bold">Docker containers</span>. This methodology guarantees deterministic execution across various Edge devices and aggressively eliminates host OS dependency conflicts when processing raw payload streams in real-time.
          </p>
        </div>

        {/* TEXT BLOCK 2 */}
        <div className="flex flex-col relative">
          <div className="absolute -left-12 top-2 hidden lg:block text-[var(--gray-light)] font-mono text-sm opacity-50">02</div>
          <h3 className="font-mono text-[var(--accent-neon-red)] text-xl md:text-2xl font-bold mb-6 border-b-2 border-[var(--gray-light)] pb-4 uppercase">
            &gt; Ingestion:<br/>MQTT & Telegraf
          </h3>
          <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-loose">
            Downlinked RF packets are decoded and immediately published to a localized <span className="bg-[var(--foreground)] text-[var(--background)] px-1 font-bold">Mosquitto MQTT broker</span>. Simultaneously, high-speed <span className="bg-[var(--foreground)] text-[var(--background)] px-1 font-bold">Telegraf JSON parsing</span> agents subscribe to these telemetry topics, rapidly sanitizing and formatting the chaotic raw sensor arrays before routing them into persistent storage.
          </p>
        </div>

        {/* TEXT BLOCK 3 */}
        <div className="flex flex-col relative">
          <div className="absolute -left-12 top-2 hidden lg:block text-[var(--gray-light)] font-mono text-sm opacity-50">03</div>
          <h3 className="font-mono text-[var(--accent-telemetry-orange)] text-xl md:text-2xl font-bold mb-6 border-b-2 border-[var(--gray-light)] pb-4 uppercase">
            &gt; Time-Series:<br/>InfluxDB
          </h3>
          <p className="font-mono text-[var(--foreground)] text-sm md:text-base leading-loose">
            Structured telemetry is indexed natively into an <span className="bg-[var(--foreground)] text-[var(--background)] px-1 font-bold">InfluxDB time-series database</span>. Optimized specifically for heavy write loads, it effortlessly absorbs thousands of data points per second from the satellite swarm, enabling sub-millisecond query latency for the Grafana visualization layer above.
          </p>
        </div>

      </div>

    </section>
  );
}
