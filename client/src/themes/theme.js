import { createTheme } from "@material-ui/core";

const paletteColors = {
  primary: { main: "#3A8DFF", light: "#86B9FF" },
  secondary: { main: "#B0B0B0" }
}

export const theme = createTheme({
  palette: {...paletteColors},
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
        fontWeight: "bold",
        paddingLeft: 2,
      },
      underline: {
        "&:before": {
          borderBottomWidth: 2,
          borderBottomColor: "rgba(0,0,0,0.1)",
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottomColor: "rgba(0,0,0,0.3)",
        },
        "&:after": {
          borderBottomWidth: 2,
        }
      }
    },
    MuiButton: {
      contained: {
        fontFamily: "Montserrat, sans-serif",
        color: "#FFFFFF",
        backgroundColor: paletteColors.primary.main,
        "&:hover": {
          backgroundColor: paletteColors.primary.light,
        },
      },
      textSizeLarge: {
        padding: "11px 33px",
      }
    }
  },
});
