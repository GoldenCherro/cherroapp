import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Fade,
  Snackbar,
  Slide,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
  goToPage,
  routeNaming,
} from '../../routes';
import styles from './register.module.scss';
// import globalStyles from '../../assets/stylesheets/global-styles.module.scss';
import { RegisterController } from '../../networking/controllers/register-controller';
import { User } from '../../models/user';

function SlideTransition(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="up" />;
}

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordA, setPasswordA] = useState('');
  const [passError, setPassError] = useState(false);
  const [msg, setMsg] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  useEffect(() => {
    if ((passwordA.length > 0) && (passwordA !== password)) {
      setPassError(true);
      setButtonDisabled(true);
    } else {
      setPassError(false);
    }
  }, [password, passwordA]);

  useEffect(() => {
    if ((password.length > 0)
      && (passwordA.length > 0)
      && (password === passwordA)) {
      setButtonDisabled(false);
    }
  }, [password, passwordA]);

  useEffect(() => {
    if ((password.length === 0)
    || (passwordA.length === 0)) {
      setButtonDisabled(true);
    }
  }, [password, passwordA]);

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

  const registerHandler = async (data) => {
    data.preventDefault();
    try {
      if (passwordA === password) {
        const user = new User({ name, nickname, pass: password });
        const response = await RegisterController.register(user);
        setMsg(response.msg);
        goToPage(routeNaming.LOGIN);
      }
    } catch (err) {
      setMsg('No pudiste registrarte. Intentá de nuevo amiguín.');
    }
  };

  return (
    <>
      <form
        onSubmit={registerHandler}
        className={styles.registerForm}
        autoComplete="off"
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography
            className={styles.registerTitle}
          >
            Cherro-Register
          </Typography>
          <TextField
            variant="filled"
            label="Name"
            type="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
          <TextField
            variant="filled"
            label="Nickname"
            type="nickname"
            onChange={(event) => setNickname(event.target.value)}
            value={nickname}
            required
          />
          <TextField
            variant="filled"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <TextField
            variant="filled"
            label="Repeat Password"
            type="password"
            onChange={(event) => setPasswordA(event.target.value)}
            value={passwordA}
            error={passError}
            required
          />
          <Button
            variant="outlined"
            className={styles.regBtn}
            type="submit"
            disabled={buttonDisabled}
            onClick={handleClick(SlideTransition)}
          >
            Register
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
        </Grid>
      </form>
    </>
  );
};

export { Register };
