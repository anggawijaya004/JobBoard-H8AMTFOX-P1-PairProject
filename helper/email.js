const nodemailer = require('nodemailer');

function email(emailTo){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jobs.rmt123@gmail.com',
            pass: 'amyisokay1'
        }
    });
    
    const mailOptions = {
        from: 'jobs.rmt123@gmail.com',
        to: `${emailTo}`,
        subject: 'Your Partner Job is Calling',
        text: 'Congratulation!!! You find your partner/client'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}


module.exports = email
