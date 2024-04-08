import React from "react";
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <NavBar />
                <Routes>
                    <Route path='/' element={ <Navigate to='/posts' /> } />
                    <Route path='/posts' exact element={ <Home /> } />
                    <Route path='/posts/search' exact element={ <Home /> } />
                    <Route path='/posts/:id' exact element={ <PostDetails /> } />     { /* post details path */ }
                    <Route path='/auth' exact element={ (!user ? <Auth /> : <Navigate to='/posts' />) } />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;