import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
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
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
        },
    },
})(TextField);

export default function LoginForm() {
  const classes = useStyles();


  return (
    <div>
       <form className={classes.root} noValidate>
            <LoginTextField
                className={classes.textField}
                label="Email"
                placeholder="Email"
                variant="outlined"
                id="custom-css-outlined-input"
                margin="normal"
            />

            <LoginTextField
                className={classes.textField}
                label="Password"
                variant="outlined"
                id="custom-css-outlined-input"
                margin="normal"
            />
       </form>
    </div>
  );
}