import { createTheme } from '@mui/material';
import Fjallaone from '../assets/fonts/fjallaone.woff2';

const theme = createTheme({
    typography: {
      fontFamily: "fjallaone"
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@font-face": {
            fontFamily: "fjallaone",
            src: `url(${Fjallaone}) format("truetype")`
          },
          body: {
            fontFamily: "fjallaone",
            color: "red"
          }
        }
      }
    }
  });


  export default theme;