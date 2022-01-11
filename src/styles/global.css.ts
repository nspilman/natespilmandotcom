// @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Serif:wght@300;400;500&display=swap');

import { style, globalStyle } from "@vanilla-extract/css"
import { backgroundColorPrimary, vars } from "./theme.css"
import { flexColumn, flexRow } from "./design-system.css"

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

// /* CARD STYLES */

export const blogPostsWrapper = style([
  flexRow,
  {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
])

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

export const nextAndPrevious = style({
  display: `flex`,
  flexWrap: `wrap`,
  justifyContent: `space-between`,
  listStyle: `none`,
  padding: "2em",
})
