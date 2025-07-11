import { keepTheme } from "keep-react/keepTheme";

// const colorsPalette = {
//   metal: {
//     25: "#f9fafb",
//     50: "#f0f3f9",
//     100: "#e9eff6",
//     200: "#d7dfe9",
//     300: "#afbaca",
//     400: "#8897ae",
//     500: "#5e718d",
//     600: "#455468",
//     700: "#3d4a5c",
//     800: "#2d3643",
//     900: "#1c222b",
//   },
//   primary: {
//     25: "#F4F6FF",
//     50: "#EDF0FF",
//     100: "#DDE5FF",
//     200: "#C3CDFF",
//     300: "#9EACFF",
//     400: "#7780FF",
//     500: "#5857FD",
//     600: "#4939F2",
//     700: "#3E2CD6",
//     800: "#3629B7",
//     900: "#2E2788",
//   },
//   success: {
//     25: "#eafef5",
//     50: "#d7f8e9",
//     100: "#8fe7b8",
//     200: "#48d28e",
//     300: "#2fd181",
//     400: "#1db469",
//     500: "#11a75c",
//     600: "#0a9952",
//     700: "#048746",
//     800: "#046a37",
//     900: "#02542b",
//   },
//   warning: {
//     25: "#fff9df",
//     50: "#fff2c4",
//     100: "#ffe99d",
//     200: "#f7dc7c",
//     300: "#f8d34f",
//     400: "#f5c61e",
//     500: "#e9b90b",
//     600: "#d8a800",
//     700: "#b18a00",
//     800: "#896b00 ",
//     900: "#624d00",
//   },
//   error: {
//     25: "#fff5f4",
//     50: "#ffdcda",
//     100: "#ffc5c1",
//     200: "#ffa19b",
//     300: "#ff7a72",
//     400: "#ff574d",
//     500: "#ff3838",
//     600: "#e92215",
//     700: "#d21a0e",
//     800: "#be170c",
//     900: "#ab0a00",
//   },
// };

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        primary: "#3629B7",
        secondary: "#DDE5FF",
      },
    },
  },
};

export default keepTheme(config);
