const nodemailer = require("nodemailer");
const sendGrid = require("@sendgrid/mail")

// EMAIL_SERVICE="gmail"
// EMAIL_HOST="smtp.gmail.com"
// EMAIL_PORT=465
// EMAIL_USERNAME="ceylongemsteam@gmail.com"
// EMAIL_PASSWORD="ceylonRuby2022"
// EMAIL_FROM="ceylongemsteam@gmail.com"


const sendEmail = (options) => {

  EMAIL_SERVICE="SendGrid"
  EMAIL_HOST="smtp.sendgrid.net"
  EMAIL_PORT=465
  EMAIL_USERNAME="apikey"
  EMAIL_PASSWORD="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"
  EMAIL_FROM="ceylongemsteam@gmail.com"

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass:EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  return transporter.sendMail(mailOptions);
};


module.exports = sendEmail;
























// //const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const { gmail } = require('googleapis/build/src/apis/gmail');
// const {OAuth2} = google.auth;
// const { createTransport } = require('nodemailer');


// const CLIENT_ID = '979241689950-cmevnp9vtquaindbuelobiahi3cjba25.apps.googleusercontent.com';
// const CLEINT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//04QeVbgIlU3U-CgYIARAAGAQSNwF-L9IrDJBLjN5i3luHIRmOP16SXzGLpEKRo7M6486-zu5OxMc-von54bRH22YOXmAxuigLcIM';
// const  SENDER_EMAIL_ADDRESS='ceylongemsteam@gmail.com';

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLEINT_SECRET,
//   REDIRECT_URI
// );



// async function sendEmail() {
//   oAuth2Client.setCredentials({ 
//     refresh_token: REFRESH_TOKEN 
//   });
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user:  SENDER_EMAIL_ADDRESS,
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });




//   const mailOptions = {
//     from: SENDER_EMAIL_ADDRESS,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };


//   const result = await transport.sendEmail(mailOptions);
//   return result;
// }
// catch (error) {
//   return error;
// }
// }



// module.exports = sendEmail;