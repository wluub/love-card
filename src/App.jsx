import React, { useEffect, useState } from "react";

const HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + Math.random() * 4)}%`,
  size: 11 + Math.random() * 14,
  duration: 5.5 + Math.random() * 5,
  delay: Math.random() * 3,
}));

export default function App() {
  const [opened, setOpened] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setNoteVisible(true), 300);
    return () => clearTimeout(t);
  }, [opened]);

  return (
    <div
      className={`min-h-[100dvh] flex items-center justify-center p-4 transition-colors duration-1000 overflow-hidden relative ${
        opened
          ? "bg-gradient-to-br from-rose-200 via-pink-300 to-fuchsia-300"
          : "bg-gradient-to-br from-rose-50 to-pink-100"
      }`}
    >
      {/* Floating hearts */}
      {opened && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {HEARTS.map((h) => (
            <span
              key={h.id}
              className="absolute text-white/50 select-none"
              style={{
                left: h.left,
                fontSize: h.size,
                animation: `floatUp ${h.duration}s ${h.delay}s linear infinite`,
              }}
            >♥</span>
          ))}
        </div>
      )}

      {/* Envelope button */}
      {!opened && (
        <button
          onClick={() => setOpened(true)}
          className="flex flex-col items-center gap-3 bg-white/75 border border-white/90 rounded-[2rem] px-14 py-12 backdrop-blur-xl shadow-[0_8px_32px_rgba(233,30,99,0.15)] hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
        >
          <span className="text-6xl drop-shadow-md">💌</span>
          <span className="font-serif text-2xl italic text-pink-700">buraya tıkla</span>
        </button>
      )}

      {/* Opened card */}
      {opened && (
        <div className="w-[min(88vw,380px)] animate-[popIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="bg-white/35 border border-white/60 rounded-[28px] p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(233,30,99,0.2)]">
            <div
              className={`bg-[rgba(255,253,254,0.97)] border border-pink-200/40 rounded-2xl p-8 text-center transition-all duration-700 ${
                noteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-2xl text-pink-300 mb-4">❦</div>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-5" />
              <p className="font-serif text-[13px] italic leading-[1.75] text-stone-700 whitespace-pre-wrap">
                {`Bugün sana hissettirdiğim duygular için özür dilerim...`}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mt-5 mb-4" />
              <span className="text-xl text-pink-400">♡</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(-10deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-10vh) rotate(20deg); opacity: 0; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}