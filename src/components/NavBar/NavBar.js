import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import memories from '../../images/memories.png';
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
        navigate(0);    // will cause the page to refresh
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
        <div className={classes.brandContainer} sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height='60'/>
            </div>
        </div>
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