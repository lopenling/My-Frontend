/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        primary: {
          50: "#F5FAF5",
          100: "#EDF6EE",
          200: "#D6EAD7",
          300: "#BADCBB",
          400: "#77AF79",
          500: "#547C55",
          600: "#3E5B3F",
          700: "#2F4530",
          800: "#1C291D",
          900: "#121A12",
          950: "#070A07",
        },
        secondary: {
          50: "#F7FEE9",
          100: "#EDFBCF",
          200: "#DAF7A4",
          300: "#C0EF6F",
          400: "#A6E243",
          500: "#87C824",
          600: "#689F19",
          700: "#4F7917",
          800: "#416018",
          900: "#375119",
          950: "#1B2D08",
        },
        slate: {
          50: "#f6f9fd",
          100: "#f0f4f8",
          200: "#e0e5ec",
          300: "#cdd4dd",
          400: "#97a3b4",
          500: "#63738b",
          600: "#485569",
          700: "#364151",
          800: "#1e2733",
          900: "#111923",
          950: "#020a14",
        },
        gray: {
          50: "#f7f9fc",
          100: "#f1f4f7",
          200: "#e2e5ea",
          300: "#cfd3da",
          400: "#9ca2ad",
          500: "#6a7382",
          600: "#4c5562",
          700: "#39414c",
          800: "#202730",
          900: "#131921",
          950: "#030a13",
        },
        zinc: {
          50: "#f9f9fa",
          100: "#f3f3f5",
          200: "#e4e4e7",
          300: "#d3d3d6",
          400: "#a1a1a8",
          500: "#71717b",
          600: "#53535c",
          700: "#3f3f47",
          800: "#26262b",
          900: "#18181d",
          950: "#09090f",
        },
        neutral: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e5e5e5",
          300: "#d3d3d3",
          400: "#a2a2a2",
          500: "#727272",
          600: "#545454",
          700: "#404040",
          800: "#262626",
          900: "#181818",
          950: "#090909",
        },
        stone: {
          50: "#faf9f7",
          100: "#f5f3f2",
          200: "#e6e4e2",
          300: "#d5d3cf",
          400: "#a6a19c",
          500: "#787169",
          600: "#59534d",
          700: "#443f3a",
          800: "#292622",
          900: "#1a1815",
          950: "#0b0906",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        red: {
          50: "#fcf8f8",
          100: "#faf2f3",
          200: "#f3e0e3",
          300: "#ebcbd0",
          400: "#d49099",
          500: "#ba4f5e",
          600: "#992c3b",
          700: "#76222d",
          800: "#47141b",
          900: "#2e0d12",
          950: "#130507",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },

      borderRadius: {
        none: "0px",
        sm: "1px",
        DEFAULT: "0.125rem",
        md: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
        full: "9999px",
      },

      borderColor: {
        DEFAULT: "#e6e4e2",
      },

      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
      },

      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },

      dropShadow: {
        sm: "0 1px 1px rgb(0 0 0 / 0.05)",
        DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
        md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
        lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
        xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
        "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
        none: "0 0 #0000",
      },

      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
        "9xl": ["8rem", { lineHeight: "1" }], // 128px
      },

      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },

      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
      },

      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.125rem", // 2px
        1: "0.25rem", // 4px
        1.5: "0.375rem", // 6px
        2: "0.5rem", // 8px
        2.5: "0.625rem", // 10px
        3: "0.75rem", // 12px
        3.5: "0.875rem", // 14px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        7: "1.75rem", // 28px
        8: "2rem", // 32px
        9: "2.25rem", // 36px
        10: "2.5rem", // 40px
        11: "2.75rem", // 44px
        12: "3rem", // 48px
        14: "3.5rem", // 56px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        28: "7rem", // 112px
        32: "8rem", // 128px
        36: "9rem", // 144px
        40: "10rem", // 160px
        44: "11rem", // 176px
        48: "12rem", // 192px
        52: "13rem", // 208px
        56: "14rem", // 224px
        60: "15rem", // 240px
        64: "16rem", // 256px
        72: "18rem", // 288px
        80: "20rem", // 320px
        96: "24rem", // 384px
      },
      transitionDuration: {
        DEFAULT: "125ms",
        0: "0s",
        75: "75ms",
        100: "100ms",
        125: "125ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}

