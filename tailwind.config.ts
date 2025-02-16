import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['var(--font-press-start)'],
        'vt323': ['var(--font-vt323)'],
      },
      colors: {
        'neon-pink': 'var(--neon-pink)',
        'neon-blue': 'var(--neon-blue)',
        'neon-yellow': 'var(--neon-yellow)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
