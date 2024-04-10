import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// 5 min characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

export const basicSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min().matches(passwordRules, { message: 'Please create a stronger password'} ).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Required"),
    firstName: yup.string(),
    lastName: yup.string()
})