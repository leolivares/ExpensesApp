import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, displayDialog } from "./../../features/Login/loginSlice";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
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
    // dispatch(authenticateUser({email: "leolivares@uc.cl", password: '123123'}));
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
        <Container>
          <DialogTitle id="form-dialog-title">Log In</DialogTitle> 
          <LoginForm></LoginForm>
        </Container>
      </Dialog>
    </div>
  );
}