const { Router } = require('express');
const UserModel = require('../Models/users.model');
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//end points: "/users/register" for registering any new user;
userRouter.post('/register', async (req, res) => {
    const { email, password, phone, location, name } = req.body;
    try {
        bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({
                    email, password: secure_password, phone, location
                    , name
                });
                await user.save();
                res.status(201).send({ msg: 'Registered Successfully' });
            }
        })
    } catch (err) {
        res.status(404).send({ msg: "Registation failed" });
    }
});

var count = 0;
//end points: "/users/login" for login the registered user;
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    var BlockedTime = Date.now();

    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, results) => {
                if (results) {
                    let token = jwt.sign({ id: user[0]._id, name: user[0].name }, process.env.secret_key, { expiresIn: "365d" });
                    res.status(200).send({ msg: "Login Successful", token, name: user[0].name });
                } else {
                    count++;
                    if (count == 5) {
                        await UserModel.updateOne({ email }, { $set: { BlockedTime } });
                    }
                    res.status(201).send({ msg: "Wrong Password" });
                }
            });
        } else {
            res.status(201).send({ msg: "Wrong Email ID" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Login failed" });
    }
});

// if user put 5 times wrong password then user will be blocked for limited time (24 hours)
userRouter.get('/get', async (req, res) => {
    var currentTime = Date.now();
    const { email } = req.headers;

    try {
        const user = await UserModel.findOne({ email });
        let BlockedTime = user.BlockedTime;
        if (currentTime - BlockedTime >= 86400000 && BlockedTime !== undefined) {
            await UserModel.updateOne({ email }, { $unset: { BlockedTime } });
            res.send({ msg: "Not Blocked" });
        } else if (currentTime - BlockedTime < 86400000 && BlockedTime !== undefined) {
            res.send({ msg: "Blocked" });
        } else {
            res.send({ msg: "Login Successful" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Something went wrong😒" });
    }
});

module.exports = { userRouter };