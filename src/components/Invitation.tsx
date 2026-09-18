import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import { Countdown } from "./Countdown";
import { CartoonFairy } from "./CartoonFairy";

const EVENT = {
  name: "Minha",
  theme: "Fairy Tale Garden",
  date: "Sunday, 20th September 2026",
  time: "4:00 PM onwards",
  venue: "Junis",
  mapQuery: "Junis",
  target: new Date("2026-09-20T16:00:00+05:00"),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
} as const;

function SoftPetals() {
  const items = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: `${8 + ((i * 9) % 84)}%`,
    size: 8 + (i % 3) * 4,
    delay: `${(i * 0.7) % 6}s`,
    duration: `${10 + (i % 4)}s`,
    color: i % 3 === 0 ? "#f8b4c8" : i % 3 === 1 ? "#ffe4a8" : "#b8e0c8",
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <span
          key={p.id}
          className="petal-fall"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.2,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

export function Invitation() {
  return (
    <div className="relative overflow-x-hidden">
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 garden-mist" />
        <SoftPetals />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="text-center max-w-md mx-auto w-full"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <CartoonFairy size="lg" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-2 text-[10px] font-bold tracking-[0.28em] uppercase text-[#c47890]"
          >
            Fairy Tale Garden
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-sm font-medium text-[#8a6b7a]">
            With love, you&apos;re invited to celebrate
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-script text-7xl sm:text-8xl text-[#e879a8] mt-2 leading-[1.15] pb-1"
          >
            {EVENT.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-3 text-base font-semibold text-[#8a6b7a]">
            turning <span className="inline-flex items-center justify-center size-8 rounded-full bg-[#fce4ec] text-[#e879a8] font-bold text-sm mx-1 align-middle">1</span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 invite-sheet px-6 py-6 space-y-1.5 text-center"
          >
            <p className="font-semibold text-[#5a3d55]">{EVENT.date}</p>
            <p className="text-[#8a6b7a] text-sm">{EVENT.time}</p>
            <p className="text-[#e879a8] font-bold tracking-wide pt-1">{EVENT.venue}</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative px-6 py-14 sm:py-16">
        <div className="max-w-md mx-auto text-center mb-8">
          <h2 className="font-script text-4xl text-[#e879a8]">Party details</h2>
          <div className="gold-divider w-28 mx-auto mt-3" />
        </div>

        <div className="max-w-md mx-auto invite-sheet p-7 space-y-6">
          {[
            { icon: Calendar, label: "Date", value: EVENT.date },
            { icon: Clock, label: "Time", value: EVENT.time },
            { icon: MapPin, label: "Venue", value: EVENT.venue },
            { icon: Sparkles, label: "Theme", value: EVENT.theme },
          ].map((row, i) => (
            <div key={row.label}>
              {i > 0 && <div className="h-px bg-[#f3d0dc]/80 mb-6" />}
              <div className="flex items-center gap-4 text-left">
                <div className="size-11 rounded-full bg-[#fce4ec] flex items-center justify-center shrink-0">
                  <row.icon className="size-4.5 text-[#e879a8]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a88898]">
                    {row.label}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#5a3d55] text-lg">{row.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#f0faf4]/80" />
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-script text-4xl text-[#e879a8]">Countdown</h2>
          <p className="mt-2 text-sm text-[#8a6b7a] mb-8">Until the garden party</p>
          <Countdown target={EVENT.target} />
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20">
        <div className="max-w-lg mx-auto invite-sheet p-8 text-center">
          <div className="flex justify-center mb-3">
            <CartoonFairy size="sm" />
          </div>
          <h3 className="font-script text-3xl text-[#e879a8]">Come celebrate</h3>
          <p className="mt-3 text-[#8a6b7a] leading-relaxed text-sm">
            Cake, fairy dust &amp; lots of love as {EVENT.name} turns one.
          </p>
          <div className="mt-6 rounded-2xl overflow-hidden border border-[#f3d0dc]">
            <iframe
              title="Junis location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&output=embed`}
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="pb-12 pt-2 text-center">
        <p className="font-script text-4xl text-[#e879a8]">{EVENT.name}</p>
        <p className="mt-2 text-xs font-bold tracking-[0.15em] uppercase text-[#a88898]">
          Fairy Tale Garden · First Birthday
        </p>
      </footer>
    </div>
  );
}

export const EVENT_TITLE = EVENT.name;
export const EVENT_LABEL = "First Birthday";
export const EVENT_URDU = "منہا";
