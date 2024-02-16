const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const PORT = process.env.MAILPORT;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

// Define Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'glittertech009@gmail.com',
        pass: process.env.PASS_KEY,
    },
});

app.get('/', (req, res) => {
    res.end("<h1>email sending server</h1>")
})

// Define endpoint for handling contact form submissions
app.post('/', (req, res) => {
    const { firstName, lastName, email, message, chooseTopic, phoneNumber } = req.body;

    const mailOptions = {
        from: 'glittertech009@gmail.com',
        to: 'vaibhav205.vd@gmail.com',
        subject: chooseTopic,
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                }
                p {
                  color: #555;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
              </div>
            </body>
          </html>
        `,
    };


    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
