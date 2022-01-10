import { style } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css"
import {
  flexColumn,
  flexColumnAlignItemsCenterJustifyContentCenter,
} from "../styles/design-system.css"

export const buttonContainer = style({
  textAlign: "center",
  "@media": {
    "(max-width: 600px)": {
      marginBottom: "20px",
    },
  },
})

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
