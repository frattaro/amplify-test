import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#19857b"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
      body {
        min-width: 412px;
      }
    `
    }
  }
});

export default theme;
