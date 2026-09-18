import { motion } from "framer-motion";
import { CartoonFairy } from "./CartoonFairy";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65 }}
      className="fixed inset-0 z-[100] flex items-center justify-center garden-mist"
    >
      <div className="text-center px-6">
        <div className="flex justify-center mb-2">
          <CartoonFairy size="md" />
        </div>
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#c47890]">
          Fairy Tale Garden
        </p>
        <p className="mt-2 font-script text-5xl text-[#e879a8] leading-[1.15]">Minha</p>
        <p className="mt-2 text-sm text-[#8a6b7a]">Preparing a little magic…</p>
      </div>
    </motion.div>
  );
}
