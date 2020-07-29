import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, displayDialog } from "./../../features/Register/registerSlice";
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

const RegisterTextField = withStyles({
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
    const { failedRegister } = useSelector(state => state.register);

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState('');
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputBirthday, setInputBirthday] = useState('');
    const [validNames, setValidNames] = useState(true);
    const [namesHelper, setNamesHelper] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [emailHelper, setEmailHelper] = useState('');
    const [validBirthday, setValidBirthday] = useState(true);
    const [birthdayHelper, setBirthdayHelper] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [passwordHelper, setPasswordHelper] = useState('');


    const handleClose = () => {
        dispatch(displayDialog(false));
    }

    const handleRegister = () => {
        let validInputs = true;
        if (!inputEmail) {
            setValidEmail(false);
            setEmailHelper("Email Required");
            validInputs = false;
        }
        if (!inputFirstName || !inputLastName) {
            setValidNames(false);
            setNamesHelper("Names are required");
            validInputs = false;
        }
        if (!inputBirthday) {
            validInputs = false;
            setValidBirthday(false);
            setBirthdayHelper('Birthdate is required');
        }
        if (!inputPassword || !inputPasswordConfirmation) {
            setValidPassword(false);
            setPasswordHelper("Password Required");
            validInputs = false;
        }
        if (inputPassword !== inputPasswordConfirmation) {
            setValidPassword(false);
            setPasswordHelper("Passwords doesn't match");
            validInputs = false;
        }
        if (validInputs) {
            dispatch(registerUser(
                { email: inputEmail, 
                  password: inputPassword, 
                  first_name: inputFirstName,
                  last_name: inputLastName,
                  birthday: inputBirthday}));
        }
    }

    return (
        <div>

            <DialogContent>
                <RegisterTextField
                    className={classes.textField}
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    id="email-input"
                    margin="normal"
                    error={!validEmail || failedRegister}
                    helperText={emailHelper}
                    fullWidth
                    onChange={e => setInputEmail(e.target.value)}
                />

                <RegisterTextField
                    className={classes.textField}
                    label="First Name"
                    placeholder="First Name"
                    variant="outlined"
                    id="firstname-input"
                    margin="normal"
                    error={!validNames}
                    helperText={namesHelper}
                    fullWidth
                    onChange={e => setInputFirstName(e.target.value)}
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Last Name"
                    placeholder="Last Name"
                    variant="outlined"
                    id="lastname-input"
                    margin="normal"
                    error={!validNames}
                    helperText={namesHelper}
                    fullWidth
                    onChange={e => setInputLastName(e.target.value)}
                />

                <RegisterTextField
                    id="birthday-input"
                    label="Birthdate"
                    type="date"
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!validBirthday}
                    helperText={birthdayHelper}
                    onChange={e => setInputBirthday(e.target.value)}
                    required
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Password"
                    variant="outlined"
                    id="password-input"
                    margin="normal"
                    fullWidth
                    error={!validPassword || failedRegister}
                    helperText={passwordHelper}
                    onChange={e => setInputPassword(e.target.value)}
                    type="password"
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Confirm Password"
                    variant="outlined"
                    id="password-confirmation-input"
                    margin="normal"
                    fullWidth
                    error={!validPassword}
                    helperText={passwordHelper}
                    onChange={e => setInputPasswordConfirmation(e.target.value)}
                    type="password"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
        </Button>
                <Button onClick={handleRegister} color="primary">
                    Register
        </Button>
            </DialogActions>


        </div>
    );
}