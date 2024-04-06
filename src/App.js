import React from "react";
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => (
    <BrowserRouter>
        <Container maxWidth='lg'>
            <NavBar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/auth' exact element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>
)

export default App;