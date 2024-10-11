const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // or any other library you prefer to send OTP
const app = express();

app.use(bodyParser.json());

// Replace with your email service configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

app.post('/send-otp', (req, res) => {
    const { email } = req.body; // Assuming you're sending the OTP to an email address
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send(`OTP sent to ${email}`);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
