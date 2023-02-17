import logo from './logo.svg';
import './App.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import { authProvider } from './utils/authProvider';
import { ThemeProvider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import theme from './utils/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Typography variant="h1">Hello World</Typography> */}
      <Admin
        authProvider={authProvider}
        theme={theme}
      >
        <Resource name='tags' list={ListGuesser} />
        <Resource name='other' list={ListGuesser} />
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
