import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { AppBarStyles } from "./AppBarStyles/AppBar";

declare module "@mui/material/styles" {
  interface Palette {
    creamWhite: Palette["primary"];
  }

  interface PaletteOptions {
    creamWhite?: PaletteOptions["primary"];
  }
}

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      dark: "#002984",
    },
    secondary: {
      main: "#a31545",
    },

    error: {
      main: red.A400,
    },

    creamWhite: {
      main: "#FCFBF4", // Your custom cream white color
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  components: {
    MuiAppBar: AppBarStyles,
  },
});

export { theme };
