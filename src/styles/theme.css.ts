const colors = {
  white: "white",
  yellow: "#fffe53",
  yellowLight: "#FFFF87",
  yellowDark: "#C9CB10",
  darkblue: "#1C2026",
  grayblue: "#43474E",
  ultimategray: "#939597",
  darkbluehero: "rgba(28, 32, 38, 0.9)",
  graybluehero: "rgba(67, 71, 78, 0.9)",
  lightgray: "rgba(141, 144, 154, 0.9)",
  ultimategrayhero: "rgba(147, 149, 151, 0.9)",
}

import {
  createTheme,
  createThemeContract,
  createGlobalTheme,
  styleVariants,
  style,
  globalStyle,
} from "@vanilla-extract/css"

const root = createGlobalTheme("#app", {
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
  },
  gradients: {
    background: `linear-gradient(${colors.darkblue}, ${colors.grayblue})`,
  },
  colors,
})

const colorsTheme = createThemeContract({
  primary: null,
  secondary: null,
  background: null,
  text: {
    normal: null,
    dimmed: null,
  },
})

export const lightTheme = createTheme(colorsTheme, {
  primary: colors.darkblue,
  secondary: "#DB2777",
  background: "#EFF6FF",
  text: {
    normal: "#1F2937",
    dimmed: "#6B7280",
  },
})

export const darkTheme = createTheme(colorsTheme, {
  primary: colors.white,
  secondary: "#F472B6",
  background: "#1F2937",
  text: {
    normal: "#F9FAFB",
    dimmed: "#D1D5DB",
  },
})

export const vars = { ...root, colorsTheme }

enum FontWeights {
  Light = 300,
}

const header = style([
  {
    fontWeight: FontWeights.Light,
    color: colors.yellow,
  },
])

export const headers = styleVariants({
  h1: [
    header,
    {
      fontSize: "3.5rem",
      "@media": {
        "(max-width: 600px)": {
          fontSize: "2.5rem",
        },
      },
    },
  ],
  h2: [
    header,
    {
      "@media": {
        "(max-width: 600px)": {
          fontSize: "2rem",
        },
      },
    },
  ],
  h3: [
    header,
    {
      fontSize: "1.5rem",
      "@media": {
        "(max-width: 600px)": {
          fontSize: "1.25rem",
        },
      },
    },
  ],
})

export const textColorPrimary = style({
  color: vars.colorsTheme.primary,
})

export const textAlignLeft = style({
  textAlign: "left",
})

export const marginAuto = style({
  margin: "auto",
})

globalStyle("hr", {
  border: `1px solid ${vars.colors.ultimategray}`,
})

globalStyle("a", {
  color: vars.colors.yellow,
})
