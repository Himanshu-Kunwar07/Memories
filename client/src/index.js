import React from 'react';
import ReactDom from 'react-dom/client';
import {Provider } from 'react-redux';
import {applyMiddleware, compose } from 'redux';
import {configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import reducers from './reducers';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#115293'
        },
        secondary: {
            main: '#dc004e',
            dark: '#9a0036'
        },
    },
});

const store = configureStore({reducer: reducers}, compose(applyMiddleware(thunk)));

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="652591492743-pcaunvce5c6kl9vp9hg8l4sgpv360uto.apps.googleusercontent.com">
        <BrowserRouter>
            <ThemeProvider theme= {theme}>
                <Provider store  = {store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
);


