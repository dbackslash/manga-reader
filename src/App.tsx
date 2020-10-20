import React, { useMemo } from 'react';
import 'fontsource-roboto';
import { CssBaseline, ThemeProvider, Typography, createMuiTheme } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppStateProvider, { useAppState } from './appState';
import customTheme from './theme';
import Layout from './components/Layout';
import DiscoverScreen from 'screens/DiscoverScreen';
import FavoritesScreen from 'screens/FavoritesScreen';

declare global {
  interface Window {
    require: any;
  }
}

function AppWithState() {
  const [{ theme }] = useAppState();

  const memoizedTheme = useMemo(() => createMuiTheme({
    ...customTheme,
    palette: {
      ...customTheme.palette,
      type: theme,
    }
  }), [theme]);

  return (
    <ThemeProvider theme={memoizedTheme}>
      <CssBaseline />
      
      <Router>
        <Layout title="Manga Reader">
          <Switch>
            <Route exact path="/">
              <DiscoverScreen />
            </Route>
            <Route path="/favorite">
              <FavoritesScreen />
            </Route>
            <Route path="/settings">
              <Typography variant="h5" gutterBottom>Settings</Typography>
            </Route>
          </Switch>
        </Layout>
      </Router>

    </ThemeProvider>
  );
}

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <AppWithState />
      </AppStateProvider>
    </div>
  );
}

export default App;
