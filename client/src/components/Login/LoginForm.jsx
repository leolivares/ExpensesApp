import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, displayDialog } from "./../../features/Login/loginSlice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


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
  const { failedLogin } = useSelector(state => state.login);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [emailHelper, setEmailHelper] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [passwordHelper, setPasswordHelper] = useState('');

  const emailField = React.createRef();
  const passwordField = React.createRef();

  const handleClose = () => {
    dispatch(displayDialog(false));
  }

  const handleLogin = () => {
    let validInputs = true;
    if (!inputEmail) {
      setValidEmail(false);
      setEmailHelper("Email Required");
      validInputs = false;
    }
    if (!inputPassword) {
      setValidPassword(false);
      setPasswordHelper("Password Required");
      validInputs = false;
    }
    if (validInputs) {
        dispatch(authenticateUser({ email: inputEmail, password: inputPassword }));
    }
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
          error={!validEmail || failedLogin}
          helperText={emailHelper}
          fullWidth
          onChange={e => setInputEmail(e.target.value)}
          ref={emailField}
        />

        <LoginTextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          id="password-input"
          margin="normal"
          fullWidth
          error={!validPassword || failedLogin}
          helperText={passwordHelper}
          onChange={e => setInputPassword(e.target.value)}
          ref={passwordField}
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