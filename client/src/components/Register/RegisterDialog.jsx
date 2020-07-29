import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayDialog } from "./../../features/Register/registerSlice";
// import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from './RegisterForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';


// const useStyles = makeStyles((theme) => ({

// }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function RegisterDialog() {
//   const classes = useStyles();
  const dispatch = useDispatch();

  const { openDialog } = useSelector(state => state.register);

  const handleClickOpen = () => {
    dispatch(displayDialog(true));
  };

  const handleClose = () => {
    dispatch(displayDialog(false));
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Register
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
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle> 
          <RegisterForm></RegisterForm>
        </Container>
      </Dialog>
    </div>
  );
}