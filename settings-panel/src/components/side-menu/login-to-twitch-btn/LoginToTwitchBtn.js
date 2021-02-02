import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import api from '../../../config/axios';
import './LoginToTwitchBtn.css';

const LoginToTwitchBtn = ({ history }) => {

  const [ disabled, setDisabled ] = useState(true);

  useEffect(() => {
    api.get('/auth/authorized').then((response => {
      setDisabled(response.data.authorized);
    })).catch((err) => console.error(err));
  });

  return (
    <ListItem button disabled={disabled} onClick={() => history.push('/twitch-auth')}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Login to Twitch" />
    </ListItem>
  )
}

export default withRouter(LoginToTwitchBtn);
