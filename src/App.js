import "./App.css";
import { Admin, ListGuesser, Resource, memoryStore } from "react-admin";
import { authProvider } from "./utils/authProvider";
import { ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import dataProvider from "./utils/dataProvider";

import Dashboard from "./dashboard";
import randomUser from "./randomUser";
import bigTable from "./bigTable";
import { Provider } from "react-redux";
import store from "./reducers";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Typography variant="h1">Hello World</Typography> */}
        <Admin
          authProvider={authProvider}
          theme={theme}
          dataProvider={dataProvider}
          requireAuth
          dashboard={Dashboard}
          title="My Custom Admin"
        >
          <Resource name="tags" list={ListGuesser} />
          <Resource name="users" list={ListGuesser} />
          <Resource name="randomUser" {...randomUser} />
          <Resource name="bigTable" {...bigTable} />
        </Admin>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
