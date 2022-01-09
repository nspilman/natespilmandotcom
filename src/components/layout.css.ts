// @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Serif:wght@300;400;500&display=swap');

import { style, globalStyle } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css"

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
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  marginBottom: "1.45rem",
})

export const body = style({
  margin: 0,
  background: vars.gradients.background,
  color: vars.colors.white,
  fontSize: "1rem",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
})

export const buttonContainer = style({
  textAlign: "center",
  "@media": {
    "(max-width: 600px)": {
      marginBottom: "20px",
    },
  },
})

export const menuWrap = style({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
})

export const menuToggleIcon = style({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 2,
  cursor: "pointer",
  width: "50px",
  height: "50px",
  opacity: 0,
})

//   }

//   .menu-wrap .hamburger {
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 1;
//     width: 30px;
//     height: 20px;
//     padding: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   /* Hamburger Line */
//   .menu-wrap .hamburger > div {
//     position: relative;
//     flex: none;
//     width: 100%;
//     height: 2px;
//     background: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.4s ease;
//   }

//   /* Hamburger Lines - Top & Bottom */
//   .menu-wrap .hamburger > div::before,
//   .menu-wrap .hamburger > div::after {
//     content: '';
//     position: absolute;
//     z-index: 1;
//     top: -10px;
//     width: 100%;
//     height: 2px;
//     background: inherit;
//   }

//   /* Moves Line Down */
//   .menu-wrap .hamburger > div::after {
//     top: 10px;
//   }

//   /* Toggler Animation */
//   .menu-wrap .toggler:checked + .hamburger > div {
//     transform: rotate(135deg);
//   }

//   /* Turns Lines Into X */
//   .menu-wrap .toggler:checked + .hamburger > div:before,
//   .menu-wrap .toggler:checked + .hamburger > div:after {
//     top: 0;
//     transform: rotate(90deg);
//   }

//   /* Rotate On Hover When Checked */
//   .menu-wrap .toggler:checked:hover + .hamburger > div {
//     transform: rotate(225deg);
//   }

//   /* Show Menu */
//   .menu-wrap .toggler:checked ~ .menu {
//     visibility: visible;
//   }

//   .menu-wrap .toggler:checked ~ .menu > div {
//     transform: scale(1);
//     transition-duration: var(--menu-speed);
//   }

//   .menu-wrap .toggler:checked ~ .menu > div > div {
//     opacity: 1;
//     transition:  opacity 0.4s ease 0.4s;
//   }

//   .menu-wrap .menu {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     visibility: hidden;
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .menu-wrap .menu > div {
//     background: linear-gradient(var(--darkbluehero), var(--graybluehero));
//     backdrop-filter: blur(5px);
//     width: 200vw;
//     height: 200vw;
//     display: flex;
//     flex: none;
//     align-items: center;
//     justify-content: center;
//     transform: opacity(0);
//     transition: all 0.4s ease;
//   }

//   .menu-wrap .menu > div > div {
//     text-align: center;
//     max-width: 90vw;
//     max-height: 100vh;
//     opacity: 0;
//     transition: opacity 0.4s ease;
//   }

//   .menu-wrap .menu > div > div > ul > li {
//     list-style: none;
//     color: #fff;
//     font-size: 1.5rem;
//     padding: 1rem;
//   }

//   .menu-wrap .menu > div > div > ul > li > a {
//     font-family: 'IBM Plex Mono', sans-serif;
//     font-weight: 300;
//     color: inherit;
//     text-decoration: none;
//     transition: color 0.4s ease;
//   }

//   .menu-wrap .menu > div > div > ul > li > a:hover {
//     color: var(--yellow);
//   }

// /* HERO STYLES */

// .nate{
//     display: flex;
//     justify-content: center;
//     margin: 0 auto 20px auto;
//     width:130px;
//     height: 130px;
//     border-radius: 50%;
//     border: 3px solid #939597;
//     background: url('../img/nate-professional.jpg') center center / cover no-repeat;
//     background-size: 110%;
//     filter: saturate(.9);
// }

// .p.hero{
//     margin: auto;
// }

// /* ICON STYLES */

export const iconContainer = style({
  maxWidth: "130px",
  height: "25px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "auto",
})

export const icon = style({
  height: "25px",
})

// /* CARD STYLES */

export const contentContainer = style({
  maxWidth: "1200px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  "@media": {
    "(max-width: 1200px)": {
      margin: " 0 20px",
    },
  },
})

import backgroundImage from "../assets/img/bwMountainsAndClouds.jpg"

export const hero = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  height: "70vh",
  maxHeight: "1000px",
  width: "100%",
  background: `linear-gradient(${vars.colors.darkbluehero},${vars.colors.ultimategrayhero}),
      url(${backgroundImage}) center center / cover no-repeat`,
  margin: 0,
  marginBottom: "30px",
  backgroundAttachment: "fixed",
  "@media": {
    "(max-width: 600px)": {
      height: "100vh",
    },
  },
})

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

export const cardBlogContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
})

export const cardMusic = style({
  flexBasis: "100%",
  backgroundColor: vars.colors.grayblue,
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  padding: "20px",
  ":hover": {
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
  },
})

export const cardBlog = style({
  flexBasis: "46%",
  backgroundColor: vars.colors.grayblue,
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

// .card-music {
//     flex-basis: 100%;
//     background-color: var(--grayblue);
//     box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
//     transition: all 0.3s cubic-bezier(.25,.8,.25,1);
//     padding:20px;
// }

// /* BUTTON STYLES */

// button:hover {
//     background-color: var(--ultimategray);
// }

// .button-container{
//     text-align: center;
// }

// /* FOOTER STYLES */

// .footer{
const footer = style({
  padding: "30px",
  height: "50px",
  backgroundColor: vars.colors.darkblue,
})
//     padding:30px;
//     height:50px;
//     background-color: var(--darkblue);
// }

// /* MISC STYLES */

// hr{
//     border: 1px solid var(--ultimategray);
// }

// ul{
//     /* padding: 0; */
// }

export const tag = style({
  color: vars.colors.yellow,
  cursor: "pointer",
})

/* BUTTON STYLES */

export const buttonStyle = style({
  margin: "15px 0",
  padding: "20px 40px",
  width: "160px",
  backgroundColor: vars.colors.grayblue,
  color: vars.colors.yellow,
  border: `1px solid ${vars.colors.yellow}`,
  fontFamily: `"IBM Plex Sans", sans-serif`,
  fontSize: "0.85rem",
  fontWeight: 500,
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.4s ease",
  ":hover": {
    backgroundColor: vars.colors.ultimategray,
  },
})

// a{
//   color:var(--yellow);
// }
