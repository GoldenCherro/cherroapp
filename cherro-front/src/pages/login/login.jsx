import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Slide,
  Fade,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import {
  AppLink,
  goToPage,
  routeNaming,
} from '../../routes';
import styles from './login.module.scss';
import { LoginController } from '../../networking/controllers/login-controller';

function SlideTransition(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="up" />;
}

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });
  const [msg, setMsg] = useState('');

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const handleCloseMsg = () => {
    if (msg === '') {
      setState({
        ...state,
        open: false,
      });
    }
  };

  const logIn = async (data) => {
    data.preventDefault();
    const loginIn = await LoginController.logIn(nickname, password);
    if (loginIn.error) {
      setMsg(loginIn.message);
    } else {
      goToPage(routeNaming.HOME);
    }
  };

  return (
    <>

      <form className={styles.logInForm} onSubmit={logIn} noValidate autoComplete="off">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography
            component="header"
            className={styles.logInTitle}
          >
            Cherro-Login
          </Typography>
          <div>
            <TextField
              label="Nickname"
              variant="filled"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="filled"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </Grid>
        <Grid
          container
          className={styles.logInGrid2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button
            variant="outlined"
            className="btn-prim"
            type="submit"
            disabled={nickname === '' || password === ''}
            onClick={handleClick(SlideTransition)}
          >
            Log In
          </Button>
          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            onEnter={handleCloseMsg}
            key={state.Transition.name}
          >
            <MuiAlert
              severity="warning"
            >
              {msg}
            </MuiAlert>
          </Snackbar>
          <AppLink
            routeName={routeNaming.REGISTER}
          >
            <Button
              variant="outline"
            >
              Sign up here.
            </Button>
          </AppLink>
        </Grid>
      </form>
    </>
  );
};

export { Login };
