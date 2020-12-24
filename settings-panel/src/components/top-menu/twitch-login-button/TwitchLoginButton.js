import React from 'react';
import Button from '@material-ui/core/Button';
import LoginIcon from '@material-ui/icons/ExitToApp';

import './TwitchLoginButton.css';

const TwitchLoginButton = () => {
  return (
    <Button
      href='http://localhost:3000/api/twitch/auth/'
      startIcon={<LoginIcon />}
      size="large"
      variant="contained"
      color="primary">
        Twitch Login!
    </Button>
  );
};

export default TwitchLoginButton;