module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F5F0",
        surface: "#FFFFFF",
        muted: "#F0EDE4",
        ink: "#1C211F",
        ink2: "#5C6661",
        ink3: "#A3A8A5",
        sage: "#5C715E",
        sageDark: "#4A5A4B",
        clay: "#D4A373",
        line: "#E5E2D9",
        normalBg: "#EEF2ED",
        normalText: "#4A5A4B",
        borderlineBg: "#FDF6EC",
        borderlineText: "#A8763E",
        abnormalBg: "#FAF0ED",
        abnormalText: "#A84C32",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 32px rgba(28,33,31,0.03)",
        lift: "0 18px 44px rgba(28,33,31,0.09)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
