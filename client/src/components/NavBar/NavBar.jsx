import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import LoginDialog from './../Login/LoginDialog';
import RegisterDialog from './../Register/RegisterDialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const { loginStatus } = useSelector(state => state.login);
  let userStatus;
  if (!loginStatus) {
    userStatus = <>
    <LoginDialog></LoginDialog>
    <RegisterDialog></RegisterDialog>
    </>
  } else {
    userStatus = <div>Hola</div>
  }

  return (
      <AppBar position="static">
          <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              Expenses App
          </Typography>
          {userStatus}

          </Toolbar>
      </AppBar>
  );
}