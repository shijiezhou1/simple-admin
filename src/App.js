import './App.css';
import { Admin, ListGuesser, Resource, memoryStore } from 'react-admin';
import { authProvider } from './utils/authProvider';
<<<<<<< HEAD
import { ThemeProvider, Typography } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import theme from './utils/theme';
import dataProvider from './utils/dataProvider';

import Dashboard from './dashboard';
import randomUser from './randomUser';

const App = () => {
=======
import { ThemeProvider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import theme from './utils/theme';

function App() {

>>>>>>> f5d4f4b2d4fadeed0f3d496696b5e2eb1fe19146
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Typography variant="h1">Hello World</Typography> */}
      <Admin
        authProvider={authProvider}
        theme={theme}
        dataProvider={dataProvider}
        requireAuth
        dashboard={Dashboard}
        store={memoryStore()}
        title="My Custom Admin"
      >
        
        <Resource name='tags' list={ListGuesser} />
<<<<<<< HEAD
        <Resource name='users' list={ListGuesser} />
        <Resource name='randomUser' {...randomUser} />
=======
        <Resource name='other' list={ListGuesser} />
>>>>>>> f5d4f4b2d4fadeed0f3d496696b5e2eb1fe19146
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
