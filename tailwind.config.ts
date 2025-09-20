import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        romantic: {
          red: "hsl(var(--romantic-red))",
          pink: "hsl(var(--romantic-pink))",
          gold: "hsl(var(--romantic-gold))",
          white: "hsl(var(--romantic-white))",
          purple: "hsl(var(--romantic-purple))",
          blue: "hsl(var(--romantic-blue))",
        },
        aurora: {
          pink: "hsl(var(--aurora-pink))",
          purple: "hsl(var(--aurora-purple))",
          blue: "hsl(var(--aurora-blue))",
        },
      },
      backgroundImage: {
        'gradient-romantic': 'var(--gradient-romantic)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-box': 'var(--gradient-box)',
      },
      boxShadow: {
        romantic: 'var(--shadow-romantic)',
        gold: 'var(--shadow-gold)',
        aurora: 'var(--shadow-aurora)',
        'glow-heart': 'var(--glow-heart)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "heart-float": {
          "0%": { transform: "translateY(0px) rotate(0deg) scale(0)" },
          "50%": { transform: "translateY(-30px) rotate(180deg) scale(1)" },
          "100%": { transform: "translateY(-60px) rotate(360deg) scale(0)" },
        },
        "flower-bloom": {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(180deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "0.8" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(0px) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: "0" },
        },
        "aurora": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "box-vibrate": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-1deg)" },
          "75%": { transform: "rotate(1deg)" },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 5px hsl(var(--romantic-gold))" },
          "50%": { textShadow: "0 0 20px hsl(var(--romantic-gold)), 0 0 30px hsl(var(--romantic-gold))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "heart-float": "heart-float 4s ease-out infinite",
        "flower-bloom": "flower-bloom 3s ease-out infinite",
        "particle-rise": "particle-rise 2s linear infinite",
        "aurora": "aurora 8s linear infinite",
        "box-vibrate": "box-vibrate 0.5s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
