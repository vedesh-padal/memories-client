import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// action creator: a function that returns an action
// function that returns async function with a dispatch 
const signin = (formData, navigate) => async(dispatch) => {
    try {
        // login the user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        navigate('/');
        
    }   catch (error)   {
        console.log(error);
    }
}

const signup = (formData, navigate) => async(dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        navigate('/');

    }   catch (error)   {
        console.log(error);
    }
}

export { signin, signup };