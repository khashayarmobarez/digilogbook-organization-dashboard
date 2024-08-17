import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        mainTextColor: 'var(--main-text-color)',
        primaryDarkHover: 'var(--primary-dark-hover)',
        accentColorNormal: 'var(--accent-color-normal)',
        primaryLightHover: 'var(--primary-light-hover)',
        primaryADarkHover: 'var(--primaryA-dark-hover)',
      },
      fontFamily: {
        sans: ['iransans', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
