import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, displayDialog } from "./../../features/Login/loginSlice";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { openDialog } = useSelector(state => state.login);

  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(displayDialog(true));
  };

  const handleClose = () => {
    dispatch(displayDialog(false));
    dispatch(authenticateUser({email: "leolivares@uc.cl", password: '123123'}));
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Container maxWidth='sm'>
          <Grid>
            <Grid container item xs={12} direction="row" justify="center">
              <DialogTitle id="alert-dialog-slide-title">{"Sign In"}</DialogTitle>
            </Grid>
            <Grid container item xs={12} direction="column" justify="center">
                <LoginForm></LoginForm>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}