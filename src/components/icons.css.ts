// /* ICON STYLES */

import { flexRow } from "src/styles/design-system.css"
import { style } from "@vanilla-extract/css"

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
