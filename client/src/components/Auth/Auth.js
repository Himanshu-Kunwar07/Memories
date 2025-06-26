import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signup, signin } from '../../actions/auth';



const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const state = null;
    // inState Signup 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const [isSignup, setIsSignup] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if( isSignup ){
            dispatch(signup(formData, navigate));
        }else{
            dispatch(signin(formData, navigate));
        }
    }
    const handleChange = (e)=>{
        setFormData({ ...formData,[e.target.name]: e.target.value });
    }

    const handleShowPassword = ()=> setShowPassword(!showPassword);

    const switchMode = ()=> {
        setIsSignup((prevSignup)=> !prevSignup);
        setShowPassword(false);                 
    };

  return (
    <Container component = "main" maxWidth = "xs">
        <Paper className = {classes.paper} elevation = {3}>
            <Avatar className = {classes.avatar}>
                <LockIcon color = "danger"/>
            </Avatar>
            <Typography variant = "h5">{ isSignup? 'Sign Up' : 'Sign In'}</Typography>
            <form className = {classes.form } onSubmit = {handleSubmit}>
                <Grid container spacing = {2} >
                    { 
                    isSignup && (
                        <>
                            <Input name = "firstName" label = "First Name" handleChange = { handleChange} type = 'text' autoFocus half/>
                            <Input name = "lastName" label = "Last Name" handleChange = { handleChange}  type = 'text' half/>
                        </>
                    )}
                    <Input name = "email" label = "Email Address" handleChange = {handleChange}  type = "email" />
                    <Input name = "password" label = "Password" handleChange = {handleChange}  type = { showPassword ? 'text' : "password"} handleShowPassword = { handleShowPassword }/>
                    { isSignup && <Input name = "confirmPassword" label = "Repeat Password" handleChange = {handleChange} type = "password" />}
                </Grid>
                <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    onSuccess = {(res)=> 
                        { console.log(res);
                        const result = jwtDecode(res?.credential);
                        const token = res?.credential;
                        try{
                            dispatch({type: 'AUTH', data: { result, token }})

                            navigate('/');
                        }catch(error){
                            console.log(error);
                        }}
                    }
                    onError  = {()=> console.log('error')}
                />
                <Grid container justify = "flex-end">
                    <Grid item>
                        <Button onClick = {switchMode} >
                            { isSignup ? 'Already have an account? Sign In' : "Don't have a account Sign In" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
       
    </Container>
  )
}

export default Auth