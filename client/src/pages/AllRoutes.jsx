import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Landing from './Landing';
import Signup from './Signup';

const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/' element={<Landing />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;