"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function DashboardClient() {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    username: "operator",
    aboutText: "",
    missionLog: "",
    profileImage: "/img/profile.jpg",
    themePrimaryColor: "#ff3333",
    content: {
      gallery: {
        img1: "/img/5.png", caption1: "Musuem of the Future Workshop (FHSC)",
        img2: "/img/6.png", caption2: "Future Heroes Summer Camp (FHSC)",
        img3: "/img/7.png", caption3: "CUBESAT",
        img4: "/img/8.png", caption4: "Emirates Development Bank Quick Flight Workshop Instructor",
      },
      analytics: {
        block1Title: "> Virtualization: Docker",
        block1Text: "The entire ground station analytics stack is fully isolated and deployed via Docker containers. This methodology guarantees deterministic execution across various Edge devices and aggressively eliminates host OS dependency conflicts when processing raw payload streams in real-time.",
        block2Title: "> Ingestion: MQTT & Telegraf",
        block2Text: "Downlinked RF packets are decoded and immediately published to a localized Mosquitto MQTT broker. Simultaneously, high-speed Telegraf JSON parsing agents subscribe to these telemetry topics, rapidly sanitizing and formatting the chaotic raw sensor arrays before routing them into persistent storage.",
        block3Title: "> Time-Series: InfluxDB",
        block3Text: "Structured telemetry is indexed natively into an InfluxDB time-series database. Optimized specifically for heavy write loads, it effortlessly absorbs thousands of data points per second from the satellite swarm, enabling sub-millisecond query latency for the Grafana visualization layer above."
      }
    }
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            username: data.username || prev.username,
            aboutText: data.aboutText || prev.aboutText,
            missionLog: data.missionLog || prev.missionLog,
            profileImage: data.profileImage || prev.profileImage,
            themePrimaryColor: data.themePrimaryColor || prev.themePrimaryColor,
            content: data.content && Object.keys(data.content).length > 0 ? data.content : prev.content,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch portfolio data", err);
      } finally {
        setIsFetching(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Settings saved successfully to database!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div className="font-mono text-[var(--accent-telemetry-orange)] animate-pulse">CONNECTING_TO_UPLINK...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-[var(--gray-light)] font-mono text-sm uppercase tracking-widest overflow-x-auto">
        <button type="button" onClick={() => setActiveTab("general")} className={`py-2 px-4 ${activeTab === "general" ? "text-[var(--accent-telemetry-orange)] border-b-2 border-[var(--accent-telemetry-orange)]" : "text-[var(--gray-light)] hover:text-white"}`}>Hero & About</button>
        <button type="button" onClick={() => setActiveTab("gallery")} className={`py-2 px-4 ${activeTab === "gallery" ? "text-[var(--accent-telemetry-orange)] border-b-2 border-[var(--accent-telemetry-orange)]" : "text-[var(--gray-light)] hover:text-white"}`}>Gallery Grid</button>
        <button type="button" onClick={() => setActiveTab("analytics")} className={`py-2 px-4 ${activeTab === "analytics" ? "text-[var(--accent-telemetry-orange)] border-b-2 border-[var(--accent-telemetry-orange)]" : "text-[var(--gray-light)] hover:text-white"}`}>Analytics Text</button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">[ THE_OPERATOR_BIO ]</label>
              <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={4} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
            </div>
            <div>
              <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">[ MISSION_LOG ]</label>
              <textarea name="missionLog" value={formData.missionLog} onChange={handleChange} rows={4} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">[ PROFILE_IMAGE_URL ]</label>
                <input name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">[ PRIMARY_THEME_COLOR ]</label>
                <div className="flex items-center gap-4">
                  <input type="color" name="themePrimaryColor" value={formData.themePrimaryColor} onChange={handleChange} className="h-12 w-12 bg-transparent border-0 cursor-pointer" />
                  <span className="font-mono text-[var(--foreground)]">{formData.themePrimaryColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="p-4 border border-[var(--gray-dark)] bg-neutral-900/50 space-y-4">
                <h3 className="font-mono text-[var(--accent-telemetry-orange)] uppercase">Gallery Block {num}</h3>
                <div>
                  <label className="block font-mono text-[var(--gray-light)] text-xs mb-1">Image URL</label>
                  <input value={(formData.content.gallery as any)[`img${num}`]} onChange={(e) => handleNestedChange('gallery', `img${num}`, e.target.value)} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-2 font-mono text-sm focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-[var(--gray-light)] text-xs mb-1">Caption</label>
                  <input value={(formData.content.gallery as any)[`caption${num}`]} onChange={(e) => handleNestedChange('gallery', `caption${num}`, e.target.value)} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-2 font-mono text-sm focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {[1, 2, 3].map(num => (
              <div key={num} className="p-4 border border-[var(--gray-dark)] bg-neutral-900/50 space-y-4">
                <h3 className="font-mono text-[var(--accent-telemetry-orange)] uppercase">Analytics Block {num}</h3>
                <div>
                  <label className="block font-mono text-[var(--gray-light)] text-xs mb-1">Title</label>
                  <input value={(formData.content.analytics as any)[`block${num}Title`]} onChange={(e) => handleNestedChange('analytics', `block${num}Title`, e.target.value)} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-2 font-mono text-sm focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
                </div>
                <div>
                  <label className="block font-mono text-[var(--gray-light)] text-xs mb-1">Text Content</label>
                  <textarea rows={4} value={(formData.content.analytics as any)[`block${num}Text`]} onChange={(e) => handleNestedChange('analytics', `block${num}Text`, e.target.value)} className="w-full bg-neutral-900 border border-[var(--gray-dark)] text-white p-2 font-mono text-sm focus:border-[var(--accent-telemetry-orange)] focus:outline-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-6 border-t border-[var(--gray-dark)] flex justify-between">
          <button type="button" onClick={() => signOut()} className="border border-[var(--gray-light)] text-[var(--gray-light)] font-mono uppercase px-6 py-2 hover:bg-neutral-800 transition-colors">
            DISCONNECT
          </button>
          <button type="submit" disabled={loading} className="bg-[var(--accent-telemetry-orange)] text-[var(--background)] font-mono font-bold uppercase px-8 py-2 hover:bg-[var(--accent-neon-red)] transition-colors disabled:opacity-50">
            {loading ? "SAVING..." : "COMMIT_CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
}
