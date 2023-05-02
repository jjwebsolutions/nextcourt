import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // Colors Theme
      darkest: "#222831", // Black
      dark: "#393E46", // Dark gray
      lightest: "#EEEEEE", // Light gray
      light: "#00ADB5", // Teal
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
