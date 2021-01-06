import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  withMargin: {
    marginTop: theme.spacing(2),
  },
}));

const Redirect = ({ href, history }) => {
  if (! href) {
    history.goBack();
  }
  const classes = useStyles();

  const redirect = () => {
    window.location.href = href;
  };

  return (
    <Alert severity="warning" variant="standard" >
      <AlertTitle>External link warning</AlertTitle>
      You are going to leave this website to the following URL: <strong>{href}</strong>
      <div className={classes.withMargin}>
        <ButtonGroup variant="contained" size="large">
          <Button startIcon={<ArrowBackIcon />} onClick={() => history.goBack()} color="primary">Back</Button>
          <Button endIcon={<ArrowForwardIcon />} onClick={() => redirect()} color="secondary">Go to the website</Button>
        </ButtonGroup>
      </div>
    </Alert>
  );
}

export default withRouter(Redirect);
