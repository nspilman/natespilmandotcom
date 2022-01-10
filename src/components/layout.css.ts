// @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Serif:wght@300;400;500&display=swap');

import { style, globalStyle } from "@vanilla-extract/css"
import { backgroundColorPrimary, vars } from "../styles/theme.css"
import {
  flexColumn,
  flexRow,
  flexColumnAlignItemsCenterJustifyContentCenter,
} from "../styles/design-system.css"

globalStyle("html", {
  MozTextSizeAdjust: "100%",
  WebkitTextSizeAdjust: "100%",
  font: "112.5%/1.45em georgia, serif, sans-serif",
  boxSizing: "border-box",
  overflowY: "scroll",
  height: "100%",
  width: "100%",
  fontFamily: "'IBM Plex Sans', sans-serif",
})

globalStyle("body", { margin: 0 })

globalStyle("img", {
  borderStyle: "none",
  maxWidth: "100%",
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  padding: 0,
  marginBottom: "1.45rem",
})

export const body = style([
  flexColumn,
  {
    margin: 0,
    background: vars.colorsTheme.background,
    color: vars.colorsTheme.text,
    fontSize: "1rem",
    overflowX: "hidden",
  },
])

export const buttonContainer = style({
  textAlign: "center",
  "@media": {
    "(max-width: 600px)": {
      marginBottom: "20px",
    },
  },
})

const topLeft = style({
  top: 0,
  left: 0,
})

export const menuWrap = style([
  topLeft,
  {
    position: "fixed",
    zIndex: 1,
  },
])

export const menuToggleIcon = style([
  topLeft,
  {
    position: "absolute",
    zIndex: 2,
    cursor: "pointer",
    width: "50px",
    height: "50px",
    opacity: 0,
  },
])

// /* ICON STYLES */

export const iconContainer = style([
  flexRow,
  {
    maxWidth: "130px",
    height: "25px",
    justifyContent: "space-between",
    margin: "auto",
  },
])

export const icon = style({
  height: "25px",
})

// /* CARD STYLES */

export const contentContainer = style([
  flexColumn,
  {
    maxWidth: "1200px",
    margin: "auto",
    "@media": {
      "(max-width: 1200px)": {
        margin: " 0 20px",
      },
    },
  },
])

export const hero = style([
  flexColumnAlignItemsCenterJustifyContentCenter,
  {
    textAlign: "center",
    height: "70vh",
    maxHeight: "1000px",
    width: "100%",
    background: vars.colorsTheme.bannerBackground,
    margin: 0,
    marginBottom: "30px",
    backgroundAttachment: "fixed",
    "@media": {
      "(max-width: 600px)": {
        height: "100vh",
      },
    },
  },
])

export const heroContainer = style({
  width: "50%",
  maxWidth: "1200px",
  "@media": {
    "(max-width: 600px)": {
      width: "90%",
      marginTop: 0,
    },
  },
})

export const cardBlogContainer = style([
  flexRow,
  {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
])

export const cardMusic = style({
  flexBasis: "100%",
  backgroundColor: vars.colorsTheme.elementBackground,
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  padding: "20px",
  ":hover": {
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
  },
})

export const cardBlog = style({
  flexBasis: "46%",
  backgroundColor: vars.colorsTheme.elementBackground,
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  padding: "20px",
  marginBottom: "20px",
  ":hover": {
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
  },
  "@media": {
    "(max-width: 1200px)": {
      flexBasis: "100%",
    },
  },
})

import myHeadshot from "../assets/img/nate-professional.jpg"

export const nateIcon = style({
  display: "flex",
  justifyContent: "center",
  margin: "0 auto 20px auto",
  width: "130px",
  height: "130px",
  borderRadius: "50%",
  border: "3px solid #939597",
  background: `url(${myHeadshot}) center center / cover no-repeat`,
  backgroundSize: "110%",
  filter: "saturate(0.9)",
})

// /* FOOTER STYLES */

export const footer = style({
  padding: "30px",
  height: "50px",
  backgroundColor: vars.colors.darkblue,
})

// /* MISC STYLES */

export const tag = style({
  color: vars.colorsTheme.headersAndLinks,
  cursor: "pointer",
})

export const themeToggler = style({
  position: "fixed",
  padding: "1rem",
  top: 0,
  right: 15,
  width: "150px",
  zIndex: 100,
})

export const menuItemStyles = style({
  color: vars.colorsTheme.menuItemPrimary,
  ":hover": {
    color: vars.colorsTheme.menuItemSecondary,
  },
})

export const contentPageWrapper = style({
  padding: "5rem",
  "@media": {
    "(max-width: 768px)": {
      padding: "2rem",
    },
  },
})

export const postStyle = style([
  backgroundColorPrimary,
  {
    padding: "5rem 3rem",
    "@media": {
      "(max-width: 1068px)": {
        padding: "5rem 0.5rem",
      },
    },
  },
])

export const postBodyStyle = style([
  {
    maxWidth: "1200px",
    margin: "auto",
    padding: "3rem 2rem",
    "@media": {
      "(max-width: 768px)": {
        padding: "2rem 0.5rem",
      },
    },
  },
])
