import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import api from '../../config/axios';
import './TopMenu.css';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  profileImage: {
    width: '64px',
    height: '64px',
    borderRadius: '50px',
  },
});

const TopMenu = ({ className }) => {
  const classes = useStyles();

  const [ profileImage, setProfileImage ] = useState();
  const [ channelName, setChannelName ] = useState('Settings Panel');
  useEffect(() => {
    api.get('/user').then((response) => {
      setProfileImage(response.data.profileImageUrl);
      setChannelName(response.data.displayName);
    }).catch((err) => {
      console.error(err);
    });
  });

  return (
    <div>
      <AppBar className={className} position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="body1">{channelName}</Typography>
          {profileImage && <img className={classes.profileImage} src={profileImage} alt="Twitch profile" />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopMenu;