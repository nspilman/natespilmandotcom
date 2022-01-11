import { style } from "@vanilla-extract/css"
import { flexColumn } from "../styles/design-system.css"
import { vars } from "../styles/theme.css"

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

export const menuWrap = style([
  topLeft,
  {
    position: "fixed",
    zIndex: 1,
  },
])

export const menuItemStyles = style({
  color: vars.colorsTheme.menuItemPrimary,
  ":hover": {
    color: vars.colorsTheme.menuItemSecondary,
  },
})

export const themeToggler = style({
  position: "fixed",
  padding: "1rem",
  top: 0,
  right: 15,
  width: "150px",
  zIndex: 100,
})

// /* FOOTER STYLES */

export const footer = style({
  padding: "30px",
  height: "50px",
  backgroundColor: vars.colors.darkblue,
})
