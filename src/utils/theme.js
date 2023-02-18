<<<<<<< HEAD
import Fjallaone from '../assets/fonts/fjallaone.woff2';
import { createTheme } from '@mui/material';
=======
import { createTheme } from '@mui/material';
import Fjallaone from '../assets/fonts/fjallaone.woff2';
>>>>>>> f5d4f4b2d4fadeed0f3d496696b5e2eb1fe19146

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

<<<<<<< HEAD
=======

>>>>>>> f5d4f4b2d4fadeed0f3d496696b5e2eb1fe19146
  export default theme;