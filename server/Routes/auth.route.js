const { Router } = require('express');
const authRouter = Router();
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'AC102f7e174b6599c89f048a36e7e77779';
const authToken = 'c53a6d068757e3b30914d5140422e7b2';
const client = new twilio(accountSid, authToken, {
    autoRetry: true,
    maxRetries: 3
});

// Generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
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
        from: '+18582175686',
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
        res.status(401).send({ msg: 'Invalid OTP' });
    }
});


module.exports = { authRouter };