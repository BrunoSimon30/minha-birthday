import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FairyGate } from "@/components/FairyGate";
import { Invitation, EVENT_TITLE } from "@/components/Invitation";
import { AmbienceToggle } from "@/components/AmbienceToggle";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Minha's First Birthday · Fairy Tale Garden" },
      {
        name: "description",
        content:
          "You're invited to Minha's First Birthday — Fairy Tale Garden party on Sunday, 20th September 2026 at 4:00 PM at Junis.",
      },
      { property: "og:title", content: "Minha's First Birthday · Fairy Tale Garden" },
      {
        property: "og:description",
        content: "Fairy Tale Garden first birthday — Sunday 20 Sep 2026, 4 PM, Junis.",
      },
    ],
  }),
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <AmbienceToggle playWhenReady />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="relative min-h-[100svh] flex items-center justify-center px-5 py-14 overflow-hidden garden-mist"
          >
            <div className="w-full max-w-sm mx-auto text-center">
              <motion.p
                animate={{
                  opacity: opening ? 0 : 1,
                  y: opening ? -12 : 0,
                  height: opening ? 0 : "auto",
                  marginBottom: opening ? 0 : 24,
                }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden text-[10px] font-bold tracking-[0.28em] uppercase text-[#c47890]"
              >
                Once upon a time
              </motion.p>

              <FairyGate
                titleName={EVENT_TITLE}
                onOpening={() => setOpening(true)}
                onOpened={() => setOpened(true)}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Invitation />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
