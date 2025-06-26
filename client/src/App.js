import React  from 'react';
import {Container } from '@mui/material';

import Navbar from './components/navbar/Navbar.js';
import useStyle from './styles';
import { Routes, Route, Navigate, } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';




const user = JSON.parse(localStorage.getItem('profile'));


const Redirect = ()=>{  
        if(user) {
          return <Navigate to ="/posts" />
           }
        else{ 
          return  <Auth />
           }
        }

const App = () =>{

    
  

    return(
        
        <Container maxwidth = "lg">
            <Navbar />
            <Routes>
                <Route path = "/" element = {<Navigate to = "/posts" replace/>} />
                <Route path = "/posts" element = {<Home />} />
                <Route path = "/posts/search" element = {<Home />} />
                <Route path = "/posts/:id" element = {<PostDetails />} />
                <Route path = "/auth" element = { <Redirect /> } />
            </Routes>
        </Container>
        
    )
}

export default App;