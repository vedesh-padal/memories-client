import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import memoriesLogo from '../../images/memories-logo-f-removebg-preview.png';
import memoriesText from '../../images/memories-text.png'
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';

const NavBar = () => {
  
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');    // will cause the page to refresh
        setUser(null);
    }


    useEffect(() => {
        const token = user?.token;

        if (token)  {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to='/' className={classes.brandContainer} >
            <img src={memoriesText} alt='icon' height='45px'/>
            <img className={classes.image} src={memoriesLogo} alt='icon' height='60px'/>
        </Link>
        <Toolbar className={classes.toolbar}>
            { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{ user.result.name.charAt(0) }</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={ logout }>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )
            }
        </Toolbar>
        
    </AppBar>
  )
}

export default NavBar;