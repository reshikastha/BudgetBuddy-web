export const colors = {
  primary: "#a3e635",
  primaryLight: "#0ea5e9",
  primaryDark: "#0369a1",

  text: "#ffffff",
  textLight: "#e5e5e5",
  textLighter: "#d4d4d4",

  white: "#ffffff",
  black: "#000000",
  rose: "#ef4444",
  green: "#16a34a",
  purple: "#8b5cf6",

  neutral50: "#fafafa",
  neutral100: "#f5f5f5",
  neutral200: "#e5e5e5",
  neutral300: "#d4d4d4",
  neutral350: "#cccccc",
  neutral400: "#a3a3a3",
  neutral500: "#737373",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#262626",
  neutral900: "#171717",
} as const;

export const spacingX = {
  _3: 3,
  _5: 5,
  _7: 7,
  _10: 10,
  _12: 12,
  _15: 15,
  _20: 20,
  _25: 25,
  _30: 30,
  _35: 35,
  _40: 40,
} as const;

export const spacingY = {
  _5: 5,
  _7: 7,
  _10: 10,
  _12: 12,
  _15: 15,
  _17: 17,
  _20: 20,
  _25: 25,
  _30: 30,
  _35: 35,
  _40: 40,
  _50: 50,
  _60: 60,
} as const;

export const radius = {
  _3: 3,
  _6: 6,
  _10: 10,
  _12: 12,
  _15: 15,
  _17: 17,
  _20: 20,
  _30: 30,
} as const;

export const theme = {
  colors,
  spacingX,
  spacingY,
  radius,
} as const;

export type AppTheme = typeof theme;