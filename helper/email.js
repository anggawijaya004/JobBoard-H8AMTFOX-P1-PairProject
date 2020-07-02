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
        subject: 'Job Inquiry',
        text: 'A user is interested in your job post'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}


module.exports = email
