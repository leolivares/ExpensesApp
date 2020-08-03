import React, { useReducer } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, displayDialog } from "./../../features/Login/loginSlice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '95%'
  },
}));

const LoginTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);



export default function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();


  const loginInitialState = {
    inputEmail: '',
    inputPassword: '',
    validEmail: true,
    emailHelper: '',
    validPassword: true,
    passwordHelper: ''
  };

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'valueChange':
        return { ...state, [action.name]: action.value };
      case 'resetFormErrors':
        return { ...loginInitialState, inputEmail: state.inputEmail, inputPassword: state.inputPassword };
      case 'loginFailed':
        return {
          ...state, emailHelper: 'Invalid Email/Password',
          passwordHelper: 'Invalid Email/Password',
          validEmail: false,
          validPassword: false
        };
      case 'clear':
        return { ...loginInitialState };
      default:
        return state;
    }
  }

  const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState)

  const handleClose = () => {
    dispatch(displayDialog(false));
  }

  const handleLogin = () => {
    let validInputs = true;
    loginDispatch({ type: 'resetFormErrors' });
    if (!loginState.inputEmail) {
      loginDispatch({ type: 'valueChange', name: 'validEmail', value: false });
      loginDispatch({ type: 'valueChange', name: 'emailHelper', value: 'Email Required' });
      validInputs = false;
    }
    if (!loginState.inputPassword) {
      loginDispatch({ type: 'valueChange', name: 'validPassword', value: false });
      loginDispatch({ type: 'valueChange', name: 'passwordHelper', value: 'Password Required' });
      validInputs = false;
    }
    if (validInputs) {
      dispatch(authenticateUser({
        email: loginState.inputEmail,
        password: loginState.inputPassword,
        loginDispatch
      }));
    }
  }

  const { loading } = useSelector(state => state.login);

  if (loading) {
    return (
      <div>
        <DialogContent>
          <Container>
            <CircularProgress color="secondary" />
          </Container>
        </DialogContent>
      </div>
    )
  }

  return (
    <div>
      <DialogContent>
        <LoginTextField
          className={classes.textField}
          label="Email"
          placeholder="Email"
          variant="outlined"
          id="email-input"
          margin="normal"
          value={loginState.inputEmail}
          error={!loginState.validEmail}
          helperText={loginState.emailHelper}
          fullWidth
          onChange={e => loginDispatch({ type: 'valueChange', name: 'inputEmail', value: e.target.value })}
        />

        <LoginTextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          id="password-input"
          margin="normal"
          value={loginState.inputPassword}
          fullWidth
          error={!loginState.validPassword}
          helperText={loginState.passwordHelper}
          onChange={e => loginDispatch({ type: 'valueChange', name: 'inputPassword', value: e.target.value })}
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Sign In
        </Button>
      </DialogActions>


    </div>
  );
}