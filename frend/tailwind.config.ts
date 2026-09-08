import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core teal brand ramp — matches the deep-teal hero/CTA sections in the design
        teal: {
          50: "#EEF7F8",
          100: "#D7ECEE",
          200: "#AFD9DC",
          400: "#3D97A3",
          500: "#237885",
          600: "#166270",
          700: "#125460",
          800: "#0F454F",
          900: "#0B3840",
          950: "#082A30",
        },
        // Navy used for the footer
        navy: {
          800: "#1B2A45",
          900: "#141F35",
          950: "#0E1626",
        },
        // Warm off-white section background
        cloud: "#EEF6F8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
