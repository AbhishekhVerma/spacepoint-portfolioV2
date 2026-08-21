"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardClient() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "operator",
    aboutText: "A multidisciplinary 3rd-year Computer Science student...",
    missionLog: "My engineering portfolio highlights practical deployments...",
    profileImage: "/img/profile.jpg",
    themePrimaryColor: "#ff3333",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a full implementation, this would send a PUT request to /api/portfolio
    setTimeout(() => {
      alert("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

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
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)]"
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
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)]"
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
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)]"
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
            className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:border-[var(--accent-telemetry-orange)]"
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
