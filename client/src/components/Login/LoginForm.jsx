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
    // dispatch(authenticateUser({email: "leolivares@uc.cl", password: '123123'}));
  }

  const handleLogin = () => {
    console.log(inputEmail);
    console.log(inputPassword);
    if (!inputEmail) {
      console.log(emailField.current);
      setValidEmail(false);
      setEmailHelper("Email Required");
    }
    if (!inputPassword) {
      setValidPassword(false);
      setPasswordHelper("Password Required");
    }
    // dispatch(displayDialog(false));
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
          error={!validEmail}
          helperText={emailHelper}
          fullWidth
          onChange={e => setInputEmail(e.target.value)}
          ref={emailField}
        />

        <LoginTextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          id="custom-css-outlined-input"
          margin="normal"
          fullWidth
          error={!validPassword}
          helperText={passwordHelper}
          onChange={e => setInputPassword(e.target.value)}
          ref={passwordField}
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