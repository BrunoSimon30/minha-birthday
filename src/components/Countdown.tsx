import { useEffect, useState } from "react";

export function Countdown({ target }: { target: Date }) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
      {cells.map((c) => (
        <div key={c.label} className="text-center">
          <div className="mx-auto size-[4.25rem] sm:size-24 rounded-2xl border border-[#f3d0dc] bg-white/90 flex flex-col items-center justify-center shadow-soft">
            <div className="font-display text-2xl sm:text-3xl font-bold text-[#e879a8] tabular-nums leading-none">
              {String(c.value).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-2.5 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#a88898] font-bold">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
