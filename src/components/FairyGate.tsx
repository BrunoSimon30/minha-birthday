import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CartoonFairy } from "./CartoonFairy";

interface FairyGateProps {
  onOpened: () => void;
  onOpening?: () => void;
  titleName: string;
  eventUrdu?: string;
}

const OPEN_MS = 1400;

const SPARKS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  x: Math.cos((i / 12) * Math.PI * 2) * (70 + (i % 3) * 28),
  y: Math.sin((i / 12) * Math.PI * 2) * (70 + (i % 3) * 28),
  delay: i * 0.04,
  color: i % 3 === 0 ? "#e879a8" : i % 3 === 1 ? "#e8c45a" : "#8fbf9a",
}));

/** Soft invite card — fairy flies up, magic opens the invite */
export function FairyGate({ onOpened, onOpening, titleName }: FairyGateProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const isOpen = stage !== "closed";

  const open = () => {
    if (stage !== "closed") return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([10, 30, 10]);
      } catch {
        /* noop */
      }
    }
    onOpening?.();
    setStage("opening");
    window.setTimeout(() => setStage("open"), OPEN_MS * 0.85);
    window.setTimeout(onOpened, OPEN_MS);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <motion.button
        type="button"
        onClick={open}
        disabled={isOpen}
        aria-label="Open Minha birthday invitation"
        className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-pink/50 rounded-[1.75rem] disabled:pointer-events-none touch-manipulation"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="relative mx-auto w-full aspect-[3/4.2]">
          <AnimatePresence>
            {stage === "closed" && (
              <motion.div
                key="card"
                className="invite-sheet absolute inset-0 flex flex-col items-center justify-between py-8 px-6"
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{
                  opacity: 1,
                  y: [0, -6, 0],
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.88,
                  y: 20,
                  filter: "blur(6px)",
                  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  y: {
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  },
                }}
              >
                <FloralCorner className="absolute top-3 left-3" />
                <FloralCorner className="absolute top-3 right-3 scale-x-[-1]" />
                <FloralCorner className="absolute bottom-3 left-3 scale-y-[-1]" />
                <FloralCorner className="absolute bottom-3 right-3 scale-x-[-1] scale-y-[-1]" />

                <div className="text-center z-10 pt-3">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#c47890]">
                    You&apos;re invited
                  </p>
                </div>

                {/* Spacer for fairy overlay */}
                <div className="h-[42%] w-full" aria-hidden />

                <div className="text-center z-10 pb-2">
                  <p className="font-script text-5xl sm:text-6xl text-[#e879a8] leading-[1.15] pb-1">
                    {titleName}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#8a6b7a]">
                    Fairy Tale Garden · First Birthday
                  </p>
                  <p className="mt-3 text-[11px] font-bold tracking-wide text-[#a88898]">
                    Sun 20 Sep · 4 PM · Junis
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fairy — flies up on open */}
          <AnimatePresence>
            {(stage === "closed" || stage === "opening") && (
              <motion.div
                key="fairy"
                className="absolute left-1/2 z-20 pointer-events-none"
                style={{ x: "-50%", top: "18%" }}
                initial={{ opacity: 0, scale: 0.7, y: 24 }}
                animate={
                  stage === "opening"
                    ? {
                        opacity: [1, 1, 0],
                        scale: [1, 1.15, 0.6],
                        y: [0, -30, -160],
                        rotate: [0, -8, 12],
                      }
                    : { opacity: 1, scale: 1, y: 0, rotate: 0 }
                }
                exit={{ opacity: 0 }}
                transition={
                  stage === "opening"
                    ? { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.7, delay: 0.15 }
                }
              >
                <CartoonFairy size="hero" animate={stage === "closed"} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sparkle burst on open */}
          <AnimatePresence>
            {stage === "opening" && (
              <motion.div
                key="sparks"
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Soft flash */}
                <motion.div
                  className="absolute size-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgb(255 255 255 / 0.9) 0%, rgb(255 184 212 / 0.4) 40%, transparent 70%)",
                  }}
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 2.4, 3], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                {SPARKS.map((s) => (
                  <motion.span
                    key={s.id}
                    className="absolute text-lg"
                    style={{ color: s.color }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{
                      x: s.x,
                      y: s.y,
                      opacity: [0, 1, 0],
                      scale: [0.4, 1.3, 0.2],
                    }}
                    transition={{
                      duration: 0.95,
                      delay: 0.12 + s.delay,
                      ease: "easeOut",
                    }}
                  >
                    ✦
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <AnimatePresence>
        {stage === "closed" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-center mt-6"
          >
            <motion.button
              type="button"
              onClick={open}
              className="envelope-cta"
              whileTap={{ scale: 0.96 }}
            >
              Open invitation
            </motion.button>
            <p className="mt-3 text-[11px] font-semibold text-[#a88898]">
              Tap the card or button
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-12 h-12 opacity-75 ${className}`} viewBox="0 0 60 60" aria-hidden>
      <circle cx="18" cy="18" r="8" fill="#f8b4c8" />
      <circle cx="28" cy="12" r="6" fill="#ffe4a8" />
      <circle cx="12" cy="28" r="5" fill="#b8e0c8" />
      <path d="M22 22 Q35 30 40 45" stroke="#8fbf9a" strokeWidth="2" fill="none" />
    </svg>
  );
}

export { FairyGate as DoorGate };
