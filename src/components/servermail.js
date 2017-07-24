const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'felipe@kimche.co',
    pass: 'pr3nd3t3',
  },
});

// setup email data with unicode symbols
const mailOptions = {
  from: '"Fred Foo 👻" <felipe@kimche.co>', // sender address
  to: 'felipe.bobadilla@octano.cl', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plain text body
  html: '<b>Hello world ?</b>', // html body
};

// send mail with defined transport object
app.post('/contactus', function (req, res) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
