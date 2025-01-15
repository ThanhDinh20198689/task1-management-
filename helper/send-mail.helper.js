const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, content) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {     // xác nhận tk của mk
            user: process.env.EMAIL_USER,     // tài khoản người gửi
            pass: process.env.EMAIL_PASSWORD     // mật khẩu ứng dụng của người gửi
        }
    });

    const mailOptions = {       // from gửi đơn giản đến đối phương
        from: process.env.EMAIL_USER,// sender address
        to: email,// list of receivers
        subject: subject,// Subject line
        html: content // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}