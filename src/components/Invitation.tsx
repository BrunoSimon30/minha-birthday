import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Calendar, MapPin, Clock, Sparkles, Navigation } from "lucide-react";
import { Countdown } from "./Countdown";
import { CartoonFairy } from "./CartoonFairy";

const EVENT = {
  name: "Minha",
  theme: "Fairy Tale Garden",
  date: "Sunday, 20th September 2026",
  time: "4:00 PM onwards",
  venue: "Junis Restaurant and Café",
  address:
    "1C, Sahil Commercial Street 6, D.H.A Phase 8, Defence Housing Authority, Phase 8 EXT, Phase E-8, Karachi",
  mapQuery:
    "Junis Restaurant and Café, 1C Sahil Commercial Street 6, DHA Phase 8 EXT, Karachi",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Junis Restaurant and Café, 1C Sahil Commercial Street 6, DHA Phase 8 EXT, Karachi",
    ),
  target: new Date("2026-09-20T16:00:00+05:00"),
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
} as const;

function MagicSky() {
  const stars = Array.from({ length: 42 }).map((_, i) => ({
    id: i,
    top: `${3 + ((i * 13) % 94)}%`,
    left: `${2 + ((i * 19) % 96)}%`,
    size: i % 7 === 0 ? 14 : i % 5 === 0 ? 10 : 4 + (i % 4),
    delay: `${(i * 0.28) % 4}s`,
    dur: `${1.8 + (i % 5) * 0.4}s`,
    kind: i % 4 === 0 ? "✦" : i % 4 === 1 ? "★" : i % 4 === 2 ? "✧" : "dot",
    gold: i % 3 !== 1,
  }));

  const petals = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${8 + i * 12}%`,
    delay: `${i * 0.9}s`,
    dur: `${11 + (i % 4)}s`,
    color: i % 2 === 0 ? "#ff8ec4" : "#f5d78a",
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft moon glow */}
      <div
        className="absolute -top-8 right-[8%] size-28 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, #ffe9c0 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-6 right-[12%] size-14 rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fff8e8, #f5d78a 60%, #e8b84a)",
          boxShadow: "0 0 40px 8px rgba(245, 215, 138, 0.45)",
        }}
      />

      {/* Stars */}
      {stars.map((s) =>
        s.kind === "dot" ? (
          <span
            key={s.id}
            className="absolute rounded-full star-twinkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: s.gold ? "#fff4c8" : "#ffd0e8",
              animationDelay: s.delay,
              animationDuration: s.dur,
              boxShadow: `0 0 ${s.size * 2}px ${s.gold ? "#f5d78a" : "#ffb0d0"}`,
            }}
          />
        ) : (
          <span
            key={s.id}
            className="absolute star-twinkle leading-none"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.size,
              color: s.gold ? "#f5d78a" : "#ffc0dc",
              animationDelay: s.delay,
              animationDuration: s.dur,
              textShadow: `0 0 8px ${s.gold ? "#f5d78a" : "#ffb0d0"}`,
            }}
          >
            {s.kind}
          </span>
        ),
      )}

      {/* Shooting stars */}
      <span className="shooting-star" style={{ top: "12%", left: "5%", animationDelay: "0s" }} />
      <span className="shooting-star" style={{ top: "28%", left: "40%", animationDelay: "3.5s" }} />
      <span className="shooting-star" style={{ top: "55%", left: "15%", animationDelay: "7s" }} />

      {/* Floating rose petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-fall"
          style={{
            left: p.left,
            width: 10,
            height: 14,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
            opacity: 0.65,
            borderRadius: "60% 40% 55% 45%",
          }}
        />
      ))}

      {/* Soft side roses */}
      <svg
        className="absolute left-0 top-[22%] w-16 h-40 opacity-50"
        viewBox="0 0 64 160"
        aria-hidden
      >
        <path d="M8 0 Q30 40 14 80 Q0 120 22 160" fill="none" stroke="#5a9a70" strokeWidth="2.5" />
        <circle cx="20" cy="40" r="9" fill="#d4528a" />
        <circle cx="12" cy="70" r="7" fill="#e8b84a" />
        <circle cx="24" cy="105" r="8" fill="#c44880" />
        <circle cx="20" cy="40" r="3.5" fill="#f5d78a" />
      </svg>
      <svg
        className="absolute right-0 top-[35%] w-16 h-40 opacity-50 scale-x-[-1]"
        viewBox="0 0 64 160"
        aria-hidden
      >
        <path d="M8 0 Q30 40 14 80 Q0 120 22 160" fill="none" stroke="#5a9a70" strokeWidth="2.5" />
        <circle cx="20" cy="45" r="9" fill="#d4528a" />
        <circle cx="14" cy="85" r="7" fill="#e8b84a" />
        <circle cx="22" cy="120" r="8" fill="#ff8ec4" />
      </svg>
    </div>
  );
}

function RoseFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] ${className}`}
      style={{
        background: "linear-gradient(160deg, #fff9fc 0%, #ffe8f2 50%, #f5dce8 100%)",
        border: "2px solid rgba(255, 176, 208, 0.65)",
        boxShadow:
          "0 0 0 1px rgba(232, 184, 74, 0.25), 0 20px 40px -16px rgba(60, 20, 50, 0.45)",
      }}
    >
      {/* Gold-rose edge strip */}
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #e8b84a, #d4528a, #e8b84a)",
        }}
      />
      <svg className="absolute top-2 left-2 w-10 h-10 opacity-90" viewBox="0 0 40 40" aria-hidden>
        <circle cx="12" cy="12" r="6" fill="#d4528a" />
        <circle cx="20" cy="8" r="5" fill="#e8b84a" />
        <circle cx="8" cy="20" r="4.5" fill="#c44880" />
        <circle cx="14" cy="14" r="2.5" fill="#fff" opacity="0.5" />
      </svg>
      <svg
        className="absolute top-2 right-2 w-10 h-10 opacity-90 scale-x-[-1]"
        viewBox="0 0 40 40"
        aria-hidden
      >
        <circle cx="12" cy="12" r="6" fill="#d4528a" />
        <circle cx="20" cy="8" r="5" fill="#e8b84a" />
        <circle cx="8" cy="20" r="4.5" fill="#c44880" />
        <circle cx="14" cy="14" r="2.5" fill="#fff" opacity="0.5" />
      </svg>
      {children}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #e8b84a, #d4528a, #e8b84a)",
        }}
      />
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-start gap-3.5 text-left">
      <div
        className="size-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: accent,
          boxShadow: "0 4px 0 rgba(61, 36, 64, 0.12)",
        }}
      >
        <Icon className="size-5 text-[#3d2440]" strokeWidth={2} />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#9a6080]">
          {label}
        </p>
        <p className="mt-0.5 font-semibold text-[#3d2440] text-[15px] leading-snug">{value}</p>
      </div>
    </div>
  );
}

export function Invitation() {
  return (
    <div
      className="relative overflow-x-hidden min-h-[100svh]"
      style={{
        background:
          "linear-gradient(180deg, #2a1538 0%, #5c2458 18%, #8b3468 35%, #a83d72 50%, #8b3468 70%, #3d1f4a 100%)",
      }}
    >
      <MagicSky />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 pt-14 pb-16">
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, #ff6eac55 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 80% 70%, #e8b84a22 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="relative z-10 text-center max-w-md mx-auto w-full"
        >
          <motion.div variants={fadeUp} className="flex justify-center relative mb-1">
            <div
              className="absolute inset-0 m-auto size-48 rounded-full blur-3xl opacity-70"
              style={{ background: "radial-gradient(circle, #ff8ec4, transparent 65%)" }}
            />
            <CartoonFairy size="hero" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <p
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#3d2440]"
              style={{
                background: "linear-gradient(135deg, #f5d78a, #ffb0d0)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              ✦ Fairy Tale Garden ✦
            </p>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 text-sm font-medium text-[#ffd0e4]">
            With love, you&apos;re invited to celebrate
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-script text-7xl sm:text-8xl text-white mt-1 leading-[1.12] pb-1"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(255,140,200,0.5)" }}
          >
            {EVENT.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-3 text-base font-semibold text-[#ffe0ee]">
            turning{" "}
            <span
              className="inline-flex items-center justify-center size-10 rounded-full font-display font-bold text-lg mx-1 align-middle text-[#3d2440]"
              style={{
                background: "linear-gradient(135deg, #f5d78a, #e8b84a)",
                boxShadow: "0 4px 0 #b89030, 0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              1
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <RoseFrame className="px-5 pt-7 pb-6 text-center">
              <p className="font-semibold text-[#3d2440] text-base">{EVENT.date}</p>
              <p className="text-[#9a6080] text-sm mt-1">{EVENT.time}</p>
              <div className="mt-4 pt-4 border-t border-[#e8a8c4]/70">
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#9a6080]">
                  Meet us at
                </p>
                <p className="mt-1.5 font-bold text-[#d4528a] text-lg leading-snug">
                  {EVENT.venue}
                </p>
                <p className="mt-2 text-[11px] text-[#7a5570] leading-relaxed">
                  {EVENT.address}
                </p>
              </div>
            </RoseFrame>
          </motion.div>
        </motion.div>
      </section>

      {/* DETAILS — one rich panel */}
      <section className="relative px-5 py-12 sm:py-16">
        <div className="max-w-md mx-auto text-center mb-7">
          <div className="flex justify-center -mb-1">
            <CartoonFairy size="sm" />
          </div>
          <h2
            className="font-script text-4xl text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            Party details
          </h2>
          <p className="mt-1 text-sm font-medium text-[#ffc0dc]">Everything you need to know</p>
        </div>

        <RoseFrame className="max-w-md mx-auto px-5 py-6 space-y-5">
          <DetailRow
            icon={Calendar}
            label="Date"
            value={EVENT.date}
            accent="linear-gradient(135deg, #ffb0d0, #f5d78a)"
          />
          <div className="h-px bg-gradient-to-r from-transparent via-[#e8a8c4] to-transparent" />
          <DetailRow
            icon={Clock}
            label="Time"
            value={EVENT.time}
            accent="linear-gradient(135deg, #f5d78a, #ffe9a8)"
          />
          <div className="h-px bg-gradient-to-r from-transparent via-[#e8a8c4] to-transparent" />
          <DetailRow
            icon={Sparkles}
            label="Theme"
            value={EVENT.theme}
            accent="linear-gradient(135deg, #c5f0d8, #ffb0d0)"
          />
          <div className="h-px bg-gradient-to-r from-transparent via-[#e8a8c4] to-transparent" />

          <div className="flex items-start gap-3.5 text-left">
            <div
              className="size-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #ffb0d0, #d4528a)",
                boxShadow: "0 4px 0 rgba(61, 36, 64, 0.12)",
              }}
            >
              <MapPin className="size-5 text-white" strokeWidth={2} />
            </div>
            <div className="min-w-0 pt-0.5 flex-1">
              <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[#9a6080]">
                Venue
              </p>
              <p className="mt-0.5 font-bold text-[#d4528a] text-[15px] leading-snug">
                {EVENT.venue}
              </p>
              <p className="mt-1.5 text-xs text-[#7a5570] leading-relaxed">{EVENT.address}</p>
            </div>
          </div>

          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-extrabold text-[#3d2440]"
            style={{
              background: "linear-gradient(135deg, #f5d78a, #ffb0d0)",
              boxShadow: "0 6px 0 #c09040, 0 12px 24px -8px rgba(60,20,50,0.4)",
            }}
          >
            <Navigation className="size-4" strokeWidth={2.5} />
            Open in Google Maps
          </a>
        </RoseFrame>
      </section>

      {/* COUNTDOWN */}
      <section className="relative px-5 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h2
            className="font-script text-4xl text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            Countdown
          </h2>
          <p className="mt-1 text-sm font-medium text-[#ffc0dc] mb-8">
            Until the magic begins
          </p>
          <Countdown target={EVENT.target} />
        </div>
      </section>

      {/* MAP */}
      <section className="relative px-5 py-12 pb-16">
        <RoseFrame className="max-w-lg mx-auto px-5 pt-8 pb-6 text-center">
          <div className="flex justify-center mb-1">
            <CartoonFairy size="sm" />
          </div>
          <h3 className="font-script text-3xl text-[#d4528a]">Find us</h3>
          <p className="mt-1 font-bold text-[#3d2440] text-sm">{EVENT.venue}</p>
          <p className="mt-1 text-[11px] text-[#7a5570] leading-relaxed px-1">{EVENT.address}</p>

          <div
            className="mt-5 rounded-2xl overflow-hidden"
            style={{ border: "2px solid #e8a8c4" }}
          >
            <iframe
              title="Junis Restaurant and Café location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&output=embed`}
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#d4528a]"
          >
            <Navigation className="size-3.5" />
            Get directions
          </a>
        </RoseFrame>
      </section>

      <footer className="pb-12 pt-2 text-center relative z-10">
        <p
          className="font-script text-4xl text-[#ffb0d0]"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
        >
          {EVENT.name}
        </p>
        <p className="mt-2 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#e8a8c4]">
          Fairy Tale Garden · First Birthday
        </p>
        <div className="mt-4 flex justify-center gap-2 text-[#f5d78a] text-sm" aria-hidden>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </footer>
    </div>
  );
}

export const EVENT_TITLE = EVENT.name;
export const EVENT_LABEL = "First Birthday";
export const EVENT_URDU = "منہا";
