import React, { useState, useEffect } from 'react';
import { AppBar,Typography,Button, Toolbar, Avatar } from '@mui/material';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';


const Navbar = ()=>{
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = ()=>{
        dispatch({type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    };
    useEffect(()=>{
        const token = user?.token;
        if(token) {
            const decodedToken = jwtDecode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
    <AppBar style = {{flexDirection: "row"}} className = {classes.appBar} position = "static" color = "inherit">
        <div className = {classes.brandContainer}>
        <Typography  component = {Link} to = "/" className = {classes.heading} variant = "h3" align = "center">
            Web Diaries
        </Typography>
        <img  onClick = {()=> navigate('/')} className = {classes.image} src = {memories} alt = "memories" height = "60" />
        </div>
        <Toolbar className = {classes.toolbar}>
          {user? (
                <div className = {classes.profile}>
                    <Avatar className = {classes.purple} alt = { user.result.name } src = {user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className = {classes.userName} variant = "h5">
                        {user.result.name}
                    </Typography>
                    <Button variant = "contained" className = {classes.logout} color = "secondary" onClick = {logOut}>Log out</Button>
                </div>
            ):(
                <Button component = {Link} to = "/auth" variant = "contained" color = "primary">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
    )
}


export default Navbar;