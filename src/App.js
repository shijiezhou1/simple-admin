import logo from './logo.svg';
import './App.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import { authProvider } from './utils/authProvider';
import { ThemeProvider, createTheme, Typography } from '@mui/material';
import Fjallaone from './assets/fonts/fjallaone.woff2';
import CssBaseline from "@mui/material/CssBaseline";

function App() {

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Typography variant="h1">Hello World</Typography> */}
      <Admin
        authProvider={authProvider}
        theme={theme}
      >
        <Resource name='tags' list={ListGuesser} />
      </Admin>
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //    <CssBaseline />
    //   <Admin
    //     authProvider={authProvider}
    //   >
    //     <Resource name='tags' list={ListGuesser} />
    //   </Admin>
    // </ThemeProvider>
  );
}

export default App;
