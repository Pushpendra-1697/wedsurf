const { Router } = require('express');
const UserModel = require('../Models/users.model');
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//end points: "/users/register" for registering any new user;
userRouter.post('/register', async (req, res) => {
});

//end points: "/users/login" for login the registered user;
userRouter.post('/login', async (req, res) => {
    
});

module.exports = { userRouter };