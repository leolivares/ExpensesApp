import React, { useReducer } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, displayDialog } from "./../../features/Register/registerSlice";
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

    const registerInitialState = {
        inputEmail: '',
        inputPassword: '',
        inputPasswordConfirmation: '',
        inputFirstName: '',
        inputLastName: '',
        inputBirthday: '',
        validBirthday: true,
        birthdayHelper: '',
        validNames: true,
        namesHelper: '',
        validEmail: true,
        emailHelper: '',
        validPassword: true,
        passwordHelper: ''
    };

    const registerReducer = (state, action) => {
        switch (action.type) {
            case 'valueChange':
                return { ...state, [action.name]: action.value };
            case 'resetFormErrors':
                return {
                    ...registerInitialState, inputEmail: state.inputEmail,
                    inputPassword: state.inputPassword,
                    inputBirthday: state.inputBirthday,
                    inputFirstName: state.inputFirstName,
                    inputLastName: state.inputLastName
                };
            case 'registerFailed':
                return {
                    ...state, emailHelper: 'Email already in use',
                    validEmail: false
                };
            case 'clear':
                return { ...registerInitialState };
            default:
                return state;
        }
    }

    const [registerState, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const { loading } = useSelector(state => state.register);


    const handleClose = () => {
        dispatch(displayDialog(false));
    }

    const handleRegister = () => {
        let validInputs = true;
        registerDispatch({ type: 'resetFormErrors' });
        if (!registerState.inputEmail) {
            registerDispatch({ type: 'valueChange', name: 'validEmail', value: false });
            registerDispatch({ type: 'valueChange', name: 'emailHelper', value: "Email Required" });
            validInputs = false;
        }
        if (!registerState.inputFirstName || !registerState.inputLastName) {
            registerDispatch({ type: 'valueChange', name: 'validNames', value: false });
            registerDispatch({ type: 'valueChange', name: 'namesHelper', value: "Names are required" });
            validInputs = false;
        }
        if (!registerState.inputBirthday) {
            registerDispatch({ type: 'valueChange', name: 'validBirthday', value: false });
            registerDispatch({ type: 'valueChange', name: 'birthdayHelper', value: 'Birthdate is required' });
            validInputs = false;
        }
        if (!registerState.inputPassword || !registerState.inputPasswordConfirmation) {
            registerDispatch({ type: 'valueChange', name: 'validPassword', value: false });
            registerDispatch({ type: 'valueChange', name: 'passwordHelper', value: 'Password Required' });
            validInputs = false;
        }
        if (registerState.inputPassword !== registerState.inputPasswordConfirmation) {
            registerDispatch({ type: 'valueChange', name: 'validPassword', value: false });
            registerDispatch({ type: 'valueChange', name: 'passwordHelper', value: "Passwords doesn't match" });
            validInputs = false;
        }
        if (validInputs) {
            dispatch(registerUser(
                {
                    email: registerState.inputEmail,
                    password: registerState.inputPassword,
                    first_name: registerState.inputFirstName,
                    last_name: registerState.inputLastName,
                    birthday: registerState.inputBirthday,
                    registerDispatch
                }));
        }
    }

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
                <RegisterTextField
                    className={classes.textField}
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    id="email-input"
                    margin="normal"
                    value={registerState.inputEmail}
                    error={!registerState.validEmail}
                    helperText={registerState.emailHelper}
                    fullWidth
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputEmail', value: e.target.value })}
                />

                <RegisterTextField
                    className={classes.textField}
                    label="First Name"
                    placeholder="First Name"
                    variant="outlined"
                    id="firstname-input"
                    margin="normal"
                    value={registerState.inputFirstName}
                    error={!registerState.validNames}
                    helperText={registerState.namesHelper}
                    fullWidth
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputFirstName', value: e.target.value })}
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Last Name"
                    placeholder="Last Name"
                    variant="outlined"
                    id="lastname-input"
                    margin="normal"
                    value={registerState.inputLastName}
                    error={!registerState.validNames}
                    helperText={registerState.namesHelper}
                    fullWidth
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputLastName', value: e.target.value })}
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
                    value={registerState.inputBirthday}
                    error={!registerState.validBirthday}
                    helperText={registerState.birthdayHelper}
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputBirthday', value: e.target.value })}
                    required
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Password"
                    variant="outlined"
                    id="password-input"
                    margin="normal"
                    fullWidth
                    value={registerState.inputPassword}
                    error={!registerState.validPassword}
                    helperText={registerState.passwordHelper}
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputPassword', value: e.target.value })}
                    type="password"
                />

                <RegisterTextField
                    className={classes.textField}
                    label="Confirm Password"
                    variant="outlined"
                    id="password-confirmation-input"
                    margin="normal"
                    fullWidth
                    value={registerState.inputPasswordConfirmation}
                    error={!registerState.validPassword}
                    helperText={registerState.passwordHelper}
                    onChange={e => registerDispatch({ type: 'valueChange', name: 'inputPasswordConfirmation', value: e.target.value })}
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