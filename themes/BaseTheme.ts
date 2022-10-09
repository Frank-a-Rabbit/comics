import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme"

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 641,
      laptop: 1025,
      desktop: 1440,
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#222222",
      accent: "#9ECFC5"
    },
    secondary: {
      main: "#C24868",
      transparent: "#C24868E6"
    },
    background: "#222222", 
  },
  typography: {
    h4: {
      fontFamily: "Montserrat"
    },
    h6: {
      fontFamily: "Karla"
    },
    span: {
      FontFamily: "Karla"
    },
    fontFamily: [
      "Montserrat",
      "Karla"
    ].join(",")
  }
};