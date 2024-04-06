import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

// each key representing the name of the component
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // to prevent refreshing the page on form submit

        if (isSignUp)   {
            dispatch(signup(formData, navigate));
        }   else {
            dispatch(signin(formData, navigate));
        }   
    }

    const handleChange = (e) => {   // ... => spread operator -> keeps are of the other properties as it is
        setFormData({ ...formData, [e.target.name]: e.target.value })   // keeping the previous ones as it is, and only updating those fields that are currently changing
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword ); // basic toggle logic

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        // OPTIONAL CHAINING OPERATOR (?.): special operator => that is not going to throw an error if we don't have access to res object (in this case)
        console.log(res);
        const result = jwtDecode(res?.credential);
        const token = res?.credential;
    
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');
        }   catch(error)    {
            console.log(error);
        }

    }

    const googleFailure = (err) => {
        console.log(err);
        console.log('Google Sign In was unsuccessful. Try again later!');
    }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' vairant='h5'>{ isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={ handleSubmit }>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                    { isSignUp && <Input name='confirmPassword' label='Reapeat Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    { isSignUp ? 'Sign Up' : 'Sign In' }
                </Button>
                {/* google client id: 931574300862-kfdmmv1af6et9vs66s8jfovqoh10ht6u.apps.googleusercontent.com */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GoogleOAuthProvider clientId="931574300862-kfdmmv1af6et9vs66s8jfovqoh10ht6u.apps.googleusercontent.com">
                        <GoogleLogin
                            clientId="931574300862-kfdmmv1af6et9vs66s8jfovqoh10ht6u.apps.googleusercontent.com"
                            render={ (renderProps) => (
                                <Button 
                                    variant='contained' 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />}
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        />
                    </GoogleOAuthProvider>
                </div>

                <Grid container justify='flex-end' justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an Account? Sign In' : 'Don\'t have an Account? Sign Up' }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth