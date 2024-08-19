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
        primaryANomral: 'var(--primaryA-normal)',
        mainTextColor: 'var(--main-text-color)',
        primaryDark: 'var(--primary-dark)',
        lowOpacityWhite: 'var(--low-opacity-white)',
        primaryDarkActive: 'var(--primary-dark-active)',
        accentColorNormal: 'var(--accent-color-normal)',
        accentColorNormalHover: 'var(--accent-color-normal-hover)',
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
