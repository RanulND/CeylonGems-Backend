const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
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