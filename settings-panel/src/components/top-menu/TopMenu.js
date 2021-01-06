import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './TopMenu.css';

const TopMenu = ({ openDrawer, className }) => {
  return (
    <div>
      <AppBar className={className} position="fixed">
        <Toolbar>
          <Typography variant="body1">Settings Panel</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopMenu;