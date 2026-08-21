"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function DashboardClient() {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    username: "operator",
    aboutText: "",
    missionLog: "",
    profileImage: "/img/profile.jpg",
    themePrimaryColor: "#ff3333",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            username: data.username || "operator",
            aboutText: data.aboutText || "",
            missionLog: data.missionLog || "",
            profileImage: data.profileImage || "/img/profile.jpg",
            themePrimaryColor: data.themePrimaryColor || "#ff3333",
          });
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
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
            [ PORTFOLIO_SLUG ]
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
            [ PROFILE_IMAGE_URL ]
          </label>
          <input
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
            [ THE_OPERATOR_BIO ]
          </label>
          <textarea
            name="aboutText"
            value={formData.aboutText}
            onChange={handleChange}
            rows={4}
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
            [ MISSION_LOG ]
          </label>
          <textarea
            name="missionLog"
            value={formData.missionLog}
            onChange={handleChange}
            rows={4}
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)] focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
            [ PRIMARY_THEME_COLOR ]
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              name="themePrimaryColor"
              value={formData.themePrimaryColor}
              onChange={handleChange}
              className="h-12 w-12 bg-transparent border-0 cursor-pointer"
            />
            <span className="font-mono text-[var(--foreground)]">{formData.themePrimaryColor}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--gray-dark)] flex justify-between">
          <button
            type="button"
            onClick={() => signOut()}
            className="border border-[var(--gray-light)] text-[var(--gray-light)] font-mono uppercase px-6 py-2 hover:bg-neutral-800 transition-colors"
          >
            DISCONNECT
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--accent-telemetry-orange)] text-[var(--background)] font-mono font-bold uppercase px-8 py-2 hover:bg-[var(--accent-neon-red)] transition-colors disabled:opacity-50"
          >
            {loading ? "SAVING..." : "COMMIT_CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
}
