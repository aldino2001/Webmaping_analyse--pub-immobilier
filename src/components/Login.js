import React, { useContext, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link'; // Ajout du composant Link de MUI
import { Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FloatingChips from './ChipFlote';
import LeftBar from './Main';
import { LoginContext } from './LoginContext';
//import axiosInstance from '../config/AxiosConfig';
import axios from 'axios';
export const logintest="test";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const chips = [
  { label: 'Chip 1', onDelete: () => console.log('Chip 1 deleted') },
  { label: 'Chip 2', onDelete: () => console.log('Chip 2 deleted') },
  { label: 'Chip 3', onDelete: () => console.log('Chip 3 deleted') },
];
const FloatingLogin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isconnected,setisconnected]= useState(false);
  const [opacity, setOpacity] = useState(0.2); // Opacité par défaut
  const [champOpacity,setchampopacity]= useState(0.8)
  const [isFloatingChipsExpanded, setIsFloatingChipsExpanded] = useState(true);
  const {setLoginData}=useContext(LoginContext);
  const [username,setUsername]=useState();
  const [password,setpassword]=useState();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setOpenLogin(true);
    setOpenRegister(false);
    handleClose();
  };

  const handleRegisterClick = () => {
    setOpenRegister(true);
    setOpenLogin(false); // Fermer la fenêtre de connexion lors de l'ouverture de la fenêtre d'inscription
    handleClose();
  };
  const id=1
  const handleCloseDialog = async (e) => {
    
    setOpenLogin(false);
    //setOpenRegister(false);
    console.log("name:", username, "pass",password);
    e.preventDefault();
    const log = await axios.post('http://localhost:8080/login/'+username+'/'+password)
      if (log.data.logged){
        setLoginData(log.data);
        setisconnected(true)
        console.log("test :",setLoginData)
      }else{
        console.log("false")
      }
    console.log(log.data,username);
    
  };
  const toggleFloatingChips = () => {
    setIsFloatingChipsExpanded(!isFloatingChipsExpanded);
  };
  
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
    
        <IconButton
          aria-label="notifications"
          color="inherit"
        >
          <NotificationsIcon color="primary" fontSize="large"/>
        </IconButton>
      <IconButton
        aria-controls="login-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircleIcon color="primary" fontSize="large"/>
      </IconButton>
      <Menu
        id="login-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleLoginClick}  >Login</MenuItem>
      </Menu>

      <Dialog  open={openLogin || openRegister} onClose={handleCloseDialog} TransitionComponent={Transition} PaperProps={{ style: { backgroundColor: `rgba(0, 0, 0, ${opacity})`,borderRadius:30, boxShadow: 'none' } }}>
        <DialogTitle sx={{color:'white', textAlign:'center'}}>{openRegister ? "Créer une compte" : "Se connecté"}</DialogTitle>
        <DialogContent style={{ backgroundColor: 'transparent' }}>
          <TextField autoFocus margin="dense" label="Email Address" value={username} onChange={(e) => setUsername(e.target.value)} type="email" fullWidth variant="outlined" InputProps={{ style: { backgroundColor: 'white', borderRadius:30,opacity: champOpacity, } }} />
          <TextField margin="dense" label="Password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} fullWidth variant="outlined" InputProps={{ style: { backgroundColor: 'white',borderRadius:30, opacity: champOpacity} }} />
          {openRegister && (
          <TextField margin="dense" label="Name"  fullWidth variant="outlined" InputProps={{ style: { backgroundColor: 'white',borderRadius:30, opacity: champOpacity } }} />
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          {openRegister ? (
            <Link component="button"  sx={{ color: 'rgb(130,202,250)',left:16 }} variant="body2" onClick={handleLoginClick} color="inherit">
            deja un compte ?
          </Link>
          ) : (<>
            
            <Link component="button"  sx={{ color: 'rgb(130,202,250)',left:16 }} variant="body2" onClick={handleRegisterClick} color="inherit">
              nouvelle utilisateur ?
            </Link></>
          )}
          <Button onClick={handleCloseDialog} variant="contained"  sx={{borderRadius:'16px',backgroundColor:'green',right:16}} color="primary">
            {openRegister ? "Registre" : "Login"}
          </Button>
        </DialogActions>

        <Typography variant="body1" sx={{ textAlign: 'center',color:'white', fontStyle:'italic', margin: '20px 0' }}>
            BIENVENUE dans notre plateforme !!
        </Typography>
      </Dialog>
      
    </div>
  );
};

export default FloatingLogin;
