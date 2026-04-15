import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function makeHearts(count = 24) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 20,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.45,
  }));
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  const hearts = useMemo(() => makeHearts(24), []);

  useEffect(() => {
    let timer;
    if (opened) {
      timer = setTimeout(() => setNoteVisible(true), 650);
    } else {
      setNoteVisible(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [opened]);

  const openCard = () => {
    setOpened(true);
  };

  return (
    <div
      className={`min-h-[100dvh] overflow-hidden transition-colors duration-1000 ${
        opened
          ? "bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-200"
          : "bg-gradient-to-br from-rose-50 to-pink-100"
      }`}
    >
      <div className="relative flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
        {opened && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-pink-400 will-change-transform"
                style={{
                  left: heart.left,
                  fontSize: heart.size,
                  opacity: heart.opacity,
                }}
                initial={{ y: "110vh", rotate: 0, scale: 0.8 }}
                animate={{ y: "-20vh", rotate: 25, scale: 1.15 }}
                transition={{
                  duration: heart.duration,
                  repeat: Infinity,
                  delay: heart.delay,
                  ease: "linear",
                }}
              >
                ♥
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="closed"
              onClick={openCard}
              className="relative flex w-[min(92vw,22rem)] items-center justify-center rounded-[2rem] border border-white/70 bg-white/80 px-6 py-10 shadow-[0_25px_80px_rgba(244,114,182,0.25)] backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-3 rounded-[1.7rem] border border-pink-100" />
              <div className="text-center">
                <div className="mb-4 text-6xl drop-shadow-sm">💌</div>
                <div className="font-serif text-3xl italic text-pink-700">
                  buraya tıkla
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="opened"
              className="relative flex h-[min(88dvh,42rem)] w-[min(92vw,28rem)] items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/55 shadow-[0_35px_100px_rgba(236,72,153,0.28)] backdrop-blur-xl sm:w-[min(90vw,30rem)]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-b from-white/70 to-pink-50/60" />
              <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

              <motion.div
                className="absolute left-1/2 top-1/2 z-10 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-[1.8rem] border border-pink-100 bg-[rgba(255,253,253,0.96)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:w-[88%] sm:p-7"
                initial={{ y: 180, opacity: 0, rotate: 1 }}
                animate={
                  noteVisible
                    ? { y: -2, opacity: 1, rotate: 0 }
                    : { y: 180, opacity: 0 }
                }
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-3 text-center text-2xl text-pink-400">❦</div>

                <div className="max-h-[calc(88dvh-8rem)] overflow-y-auto px-1 text-center">
                  <p className="whitespace-pre-wrap break-words font-serif text-[12px] leading-[1.55] italic text-stone-700 sm:text-[13px]">
                    Bugün sana hissettirdiğim duygular için özür dilerim. O ilk
                    dersin karmaşası geçtikten sonra yanına gelmek ve gün boyu
                    dersler boş olduğu için yanından ayrılmamaktı niyetim. Seni
                    önceki gün de göremedim ve inanamayacağın kadar çok
                    özledim. Seni çoooooooook seviyorum. Hayatta sahip olduğum
                    en kıymetli şey sensin. Geriye dönüp bakınca bugün daha
                    farklı davranabilirdim. Keşke şu anda yanında olup sarılıp
                    öpebilsem. Kokunu içime çekmenin hayaliyle geldiğim okulda
                    sana böyle hissettirdiğim için tekrar özür dilerim. Tekrarı
                    kesinlikle olmayacak. Yüz canım olsa yüzünde de senin için
                    çabalamak, seni sevmek isterdim. Seni çok seviyorum
                    sevgilim.
                  </p>
                </div>

                <div className="mt-4 text-right font-serif italic text-pink-400">
                  ♡
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}