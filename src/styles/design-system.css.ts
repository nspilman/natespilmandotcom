import { style } from "@vanilla-extract/css"

const flex = style({ display: "flex" })
const flexDirectionRow = style({ flexDirection: "row" })
const flexDirectionColumn = style({ flexDirection: "column" })
const alignItemsCenter = style([{ alignItems: "center" }])
const justifyContentCenter = style([{ justifyContent: "center" }])

export const flexRow = style([flex, flexDirectionRow])
export const flexColumn = style([flex, flexDirectionColumn])
export const flexColumnAlignItemsCenterJustifyContentCenter = style([
  flexColumn,
  alignItemsCenter,
  justifyContentCenter,
])
