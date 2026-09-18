import { motion } from "framer-motion";

type Size = "sm" | "md" | "lg" | "hero";

const SIZES: Record<Size, string> = {
  sm: "w-16 h-20",
  md: "w-28 h-36",
  lg: "w-40 h-52",
  hero: "w-48 h-60 sm:w-56 sm:h-72",
};

/** Soft watercolor-style fairy for fairy-garden birthday */
export function CartoonFairy({
  size = "md",
  className = "",
  animate = true,
}: {
  size?: Size;
  className?: string;
  animate?: boolean;
}) {
  const body = (
    <svg
      viewBox="0 0 220 280"
      className={`${SIZES[size]} ${className}`}
      aria-hidden
      style={{ filter: "drop-shadow(0 12px 20px rgba(232, 140, 170, 0.35))" }}
    >
      <defs>
        <linearGradient id="wingL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5e6ff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#d4f0ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe4f0" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wingR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5e6ff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#d4f0ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe4f0" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="dress" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#ffb8d4" />
          <stop offset="55%" stopColor="#f48fb1" />
          <stop offset="100%" stopColor="#e879a8" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#f0b429" />
        </linearGradient>
        <radialGradient id="skin" cx="0.4" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#ffe8d6" />
          <stop offset="100%" stopColor="#f5c9a8" />
        </radialGradient>
      </defs>

      {/* Soft glow under fairy */}
      <ellipse cx="110" cy="255" rx="48" ry="10" fill="#f48fb1" opacity="0.2" />

      {/* Wings — soft translucent */}
      <g opacity="0.92">
        <path
          d="M95 120 C40 90 25 150 45 175 C55 145 75 135 95 130 Z"
          fill="url(#wingL)"
          stroke="#c9b8e8"
          strokeWidth="1.2"
        />
        <path
          d="M95 125 C50 130 35 180 55 200 C65 170 80 150 95 140 Z"
          fill="url(#wingL)"
          stroke="#c9b8e8"
          strokeWidth="1"
          opacity="0.75"
        />
        <path
          d="M125 120 C180 90 195 150 175 175 C165 145 145 135 125 130 Z"
          fill="url(#wingR)"
          stroke="#c9b8e8"
          strokeWidth="1.2"
        />
        <path
          d="M125 125 C170 130 185 180 165 200 C155 170 140 150 125 140 Z"
          fill="url(#wingR)"
          stroke="#c9b8e8"
          strokeWidth="1"
          opacity="0.75"
        />
      </g>

      {/* Dress */}
      <path
        d="M88 135 C100 128 120 128 132 135 L148 220 C130 235 90 235 72 220 Z"
        fill="url(#dress)"
      />
      <path
        d="M92 155 C110 148 128 155 128 155 L135 190 C110 200 90 190 90 190 Z"
        fill="#ffd0e4"
        opacity="0.55"
      />
      {/* Dress hem petals */}
      <ellipse cx="82" cy="215" rx="14" ry="10" fill="#f48fb1" />
      <ellipse cx="110" cy="222" rx="16" ry="11" fill="#e879a8" />
      <ellipse cx="138" cy="215" rx="14" ry="10" fill="#f48fb1" />

      {/* Torso */}
      <ellipse cx="110" cy="128" rx="20" ry="16" fill="url(#skin)" />

      {/* Arms */}
      <path
        d="M92 130 C70 140 62 160 58 172"
        fill="none"
        stroke="#f5c9a8"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M128 130 C155 135 168 120 172 108"
        fill="none"
        stroke="#f5c9a8"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Wand */}
      <line x1="172" y1="108" x2="188" y2="58" stroke="#e8c45a" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(188, 48)">
        <path
          d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z"
          fill="#ffe08a"
          stroke="#e8c45a"
          strokeWidth="0.8"
        />
      </g>
      <circle cx="188" cy="48" r="3" fill="#fff" opacity="0.9" />

      {/* Head */}
      <circle cx="110" cy="88" r="34" fill="url(#skin)" />

      {/* Hair back */}
      <path
        d="M78 95 C72 130 78 155 88 165"
        fill="none"
        stroke="url(#hair)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M142 95 C148 130 142 155 132 165"
        fill="none"
        stroke="url(#hair)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Hair top */}
      <path
        d="M76 88 C76 48 110 42 110 42 C110 42 144 48 144 88 C140 62 110 58 110 58 C110 58 80 62 76 88"
        fill="url(#hair)"
      />
      {/* Soft bangs */}
      <path
        d="M85 72 C95 82 110 68 110 68 C110 68 125 82 135 72"
        fill="none"
        stroke="#f0b429"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Tiny flower crown */}
      <circle cx="100" cy="48" r="5" fill="#f48fb1" />
      <circle cx="110" cy="42" r="6" fill="#ffb8d4" />
      <circle cx="120" cy="48" r="5" fill="#f48fb1" />
      <circle cx="110" cy="48" r="3" fill="#ffe08a" />

      {/* Eyes */}
      <ellipse cx="98" cy="88" rx="4.5" ry="5.5" fill="#5a3d55" />
      <ellipse cx="122" cy="88" rx="4.5" ry="5.5" fill="#5a3d55" />
      <circle cx="99.5" cy="86" r="1.6" fill="#fff" />
      <circle cx="123.5" cy="86" r="1.6" fill="#fff" />

      {/* Soft lashes */}
      <path d="M93 82 Q96 78 100 81" fill="none" stroke="#5a3d55" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M117 81 Q121 78 125 82" fill="none" stroke="#5a3d55" strokeWidth="1.2" strokeLinecap="round" />

      {/* Cheeks */}
      <ellipse cx="86" cy="98" rx="6" ry="3.5" fill="#ffb8d4" opacity="0.65" />
      <ellipse cx="134" cy="98" rx="6" ry="3.5" fill="#ffb8d4" opacity="0.65" />

      {/* Smile */}
      <path
        d="M102 102 Q110 108 118 102"
        fill="none"
        stroke="#d4688a"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Tiny shoes */}
      <ellipse cx="98" cy="228" rx="11" ry="7" fill="#e879a8" />
      <ellipse cx="122" cy="228" rx="11" ry="7" fill="#e879a8" />
    </svg>
  );

  if (!animate) return <div className="inline-flex">{body}</div>;

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {body}
      </motion.div>
      <motion.span
        className="absolute top-2 right-0 text-[#e8c45a] text-sm"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute top-12 -left-1 text-[#c9b8e8] text-xs"
        animate={{ opacity: [0.15, 0.9, 0.15] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
      >
        ✦
      </motion.span>
    </motion.div>
  );
}
