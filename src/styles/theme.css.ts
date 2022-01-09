const colors = {
  white: "white",
  black: "rgb(10,10,10)",
  yellow: "#fffe53",
  // yellowLight: "#FFFF87",
  // yellowDark: "#C9CB10",
  darkblue: "#1C2026",
  grayblue: "#43474E",
  ultimategray: "#939597",
  darkbluehero: "rgba(28, 32, 38, 0.9)",
  graybluehero: "rgba(67, 71, 78, 0.9)",
  lightgray: "rgba(141, 144, 154, 0.9)",
  ultimategrayhero: "rgba(147, 149, 151, 0.9)",
}

const lightmodeColors = {
  imperialRed: "#e63946ff",
  honeydew: "#f1faeeff",
  powderBlue: "#a8dadcff",
  celadonBlue: "#457b9dff",
  prussianBlue: "#1d3557ff",
  lightgray: "rgba(220, 220,220, 0.9)",
}

import {
  createTheme,
  createThemeContract,
  createGlobalTheme,
  styleVariants,
  style,
  globalStyle,
} from "@vanilla-extract/css"
import backgroundImage from "../assets/img/bwMountainsAndClouds.jpg"

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
  colors,
})

const colorsTheme = createThemeContract({
  text: null,
  headersAndLinks: null,
  background: null,
  elementBackground: null,
  bannerBackground: null,
  menuItemPrimary: null,
  menuItemSecondary: null,
})

export const lightTheme = createTheme(colorsTheme, {
  text: colors.black,
  headersAndLinks: lightmodeColors.prussianBlue,
  background: `linear-gradient(${lightmodeColors.celadonBlue}, ${lightmodeColors.honeydew})`,
  elementBackground: lightmodeColors.lightgray,
  bannerBackground: `linear-gradient(${lightmodeColors.celadonBlue},rgb(0,0,0,0)),
  url(${backgroundImage}) center center / cover no-repeat`,
  menuItemPrimary: lightmodeColors.honeydew,
  menuItemSecondary: lightmodeColors.imperialRed,
})

export const darkTheme = createTheme(colorsTheme, {
  text: colors.white,
  headersAndLinks: colors.yellow,
  background: `linear-gradient(${colors.darkblue}, ${colors.grayblue})`,
  elementBackground: colors.grayblue,
  bannerBackground: `linear-gradient(${colors.darkbluehero},${colors.ultimategrayhero}),
  url(${backgroundImage}) center center / cover no-repeat`,
  menuItemPrimary: colors.yellow,
  menuItemSecondary: colors.white,
})

export const vars = { ...root, colorsTheme }

enum FontWeights {
  Light = 300,
}

const header = style([
  {
    fontWeight: FontWeights.Light,
    color: vars.colorsTheme.headersAndLinks,
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
  color: vars.colorsTheme.text,
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
  color: vars.colorsTheme.headersAndLinks,
})

globalStyle("button", {
  margin: "15px 0",
  padding: "20px 40px",
  width: "160px",
  backgroundColor: vars.colorsTheme.elementBackground,
  color: vars.colorsTheme.headersAndLinks,
  border: `1px solid ${vars.colorsTheme.headersAndLinks}`,
  fontFamily: `"IBM Plex Sans", sans-serif`,
  fontSize: "0.85rem",
  fontWeight: 500,
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.4s ease",
})

globalStyle("button:hover", {
  backgroundColor: vars.colors.ultimategray,
})

export const backgroundColorPrimary = style({
  backgroundColor: vars.colorsTheme.elementBackground,
})
