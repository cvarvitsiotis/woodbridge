import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|alert|breadcrumbs|button|card|divider|dropdown|input|link|modal|navbar|select|spinner|toggle|table|tabs|ripple|menu|popover|form|listbox|scroll-shadow|checkbox|spacer).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  darkMode: "selector",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: { foreground: "#E4E4E7" },
        },
      },
    }),
  ],
};

export default config;
