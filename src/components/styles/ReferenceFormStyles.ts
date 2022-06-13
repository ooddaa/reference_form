/* 
SYSTEMS

--- 01 TYPOGRAPHY
--- 02 COLORS
--- 03 BORDERS
--- 04 SPACING
--- 05 BREAKPOINTS

*/

export const spacing = {
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  12: "12px",
  16: "16px",
  24: "24px",
  32: "32px",
  36: "36px",
  48: "48px",
};

export const breakpoints = {
  400: "400px",
  800: "800px",
  900: "900px",
  1000: "1000px",
};

export const styles = {
  typography: {
    "title-sm": "20px",
    "title-md": "24px",
    "title-lg": "30px",
  },
  colors: {
    white: "#fff",
    black: "#000",
    "bg-primary": "rgb(228,234,241)",
    "text-primary": "#222",
    "text-light": "#444",
    "dark-blue": "rgb(20,30,43)",
    "dark-blue-hover": "rgb(20,41,46)",
    "green-primary": "#14A995",
  },
  borders: {
    small: spacing[2],
    primary: spacing[4],
    large: spacing[6],
    xlarge: spacing[8],
  },

  /* whitespace */
  spacing,
};

export const utils = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    "flex-direction": "row",
  },
  align: {
    alignItems: "center",
  },
};