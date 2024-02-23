const { Router } = require('express');
const authRouter = Router();
const twilio = require('twilio');
require('dotenv').config();
const crypto = require('crypto');

// Twilio credentials
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken, {
    autoRetry: true,
    maxRetries: 3
});

// Generate random OTP
function generateOTP() {
    return crypto.randomInt(100000, 1000000);
};

// Store generated OTPs and associated phone numbers
const otpMap = new Map();

// Endpoint to send OTP via SMS - /send-otp
authRouter.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    otpMap.set(phoneNumber, otp);

    client.messages.create({
        body: `Your OTP for authentication: ${otp}`,
        from: process.env.TwilioPhoneNumber,
        to: phoneNumber
    }).then(message => {
        res.status(200).send({ msg: `OTP sent successfully to ${phoneNumber}` });
    }).catch(error => {
        console.error(`Error sending OTP to ${phoneNumber}:`, error);
        res.status(500).send({ msg: 'Error sending OTP' });
    });
});

// Endpoint to verify OTP
authRouter.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    const storedOTP = otpMap.get(phoneNumber);

    if (Number(otp) === storedOTP) {
        res.status(200).send({ msg: 'OTP verified successfully' });
    } else {
        res.send({ msg: 'Invalid OTP' });
    }
});


module.exports = { authRouter };