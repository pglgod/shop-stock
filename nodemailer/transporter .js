
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "8xcinema@gmail.com",
    pass: "ztrv aemi eiul rbpm",
  },
});


// send mail

const mailOptions = {
  from: "8xcinema@gmail.com",
  to: "recipient@example.com",
  subject: "Hello from Nodemailer!",
  text: "This email was sent using Nodemailer and Gmail.",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.error("Error:", err);
  }
  console.log("Email sent:", info.response);
});





            // const mailOptions = {
            //   from: "8xcinema@gmail.com",
            //   to: req.body.email,
            //   subject: "OTP to verify your ShopStock account",
            //   html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px;"><a href="https://main.drmw1s6x1i03a.amplifyapp.com/" target="_blank" rel="noopener"><img style="height: 32px; vertical-align: middle;" src="https://i.pinimg.com/736x/91/d4/b5/91d4b59f1830dff53ce9444c2a9a7c3f.jpg" alt="logo" height="32px"></a>
            //             <p style="padding-top: 14px; border-top: 1px solid #eaeaea;">To authenticate, please use the following One Time Password (OTP):</p>
            //             <p style="font-size: 22px;"><strong>${genrateOTP}</strong></p>
            //             <p>This OTP will be valid for 5 minutes</p>
            //             <p>Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.<br>ShopStock will never contact you about this email or ask for any login codes or links. Beware of phishing scams.</p>
            //             <p>Thanks for visiting shopstock.com</p>
            //         </div>`
            // };

            // await  transporter.sendMail(mailOptions, (err, info) => {
            //   if (err) {
            //     return console.error("Error:", err);
            //   }
            //   console.log("Email sent:", info.response);
            // });
