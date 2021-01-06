import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import './App.css';
import TopMenu from './components/top-menu/TopMenu';
import SideMenu from './components/side-menu/SideMenu';
import Redirect from './components/redirect/Redirect';

import MainPage from './pages/main/MainPage';
import DefaultCommands from './pages/commands/default-commands/DefaultCommands';
import CustomCommands from './pages/commands/custom-commands/CustomCommands';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <div className={classes.root}>
        <CssBaseline />
        <TopMenu className={classes.appBar} />
        <SideMenu className={classes.drawer} paperClassName={classes.drawerPaper} />

        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact from="/" render={props => <MainPage {...props} />} />
            <Route path="/commands/default" component={DefaultCommands} />
            <Route path="/commands/custom" component={CustomCommands} />
            <Route path="/twitch-auth" component={() => <Redirect href="http://localhost:3000/api/twitch/auth" />} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
