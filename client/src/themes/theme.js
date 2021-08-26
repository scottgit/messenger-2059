import { createTheme } from "@material-ui/core";

const palette = {
  primary: { main: "#3A8DFF", light: "#86B9FF" },
  secondary: { main: "#B0B0B0" }
}

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    },
    MuiButton: {
      root: {
        fontFamily: "Montserrat, sans-serif",
        color: "#FFFFFF",
        backgroundColor: palette.primary.main,
        "&:hover": {
          backgroundColor: palette.primary.light,
        },
      },
      textSizeLarge: {
        padding: "11px 33px",
      }
    }
  },
});
