import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from 'react-bootstrap/Alert';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {
  AppLink,
  goToPage,
  routeNaming,
} from '../../routes';
import styles from './login.module.scss';
// import globalStyles from '../../assets/stylesheets/global-styles.module.scss';
import { LoginController } from '../../networking/controllers/login-controller';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  let msg = '';

  const logIn = async (data) => {
    data.preventDefault();
    const loggear = await LoginController.logIn(nickname, password);
    if (loggear.error) {
      msg = loggear.message;
    } else {
      goToPage(routeNaming.HOME);
    }
  };

  return (
    <>

      <form className={styles.logInForm} onSubmit={logIn} noValidate autoComplete="off">
        <Grid
          container
          className={styles.logInGrid}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div>
            <Typography
              component="header"
              className={styles.logInTitle}
            >
              Cherro-Login
            </Typography>
            <TextField
              id="nickname-txtField"
              label="Nickname"
              variant="filled"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              id="password-txtField"
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
          className={styles.logInGrid}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button
            id="logInButton"
            variant="outlined"
            className="btn-prim"
            type="submit"
            disabled={nickname === '' || password === ''}
          >
            Log In
          </Button>

          <Alert
            show={msg !== ''}
            variant="warning"
          >
            There was a problem
          </Alert>
          <AppLink
            routeName={routeNaming.REGISTER}
          >
            <Button
              id="signUpButton"
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
