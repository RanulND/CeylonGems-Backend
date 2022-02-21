const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { createTransport } = require('nodemailer');


const CLIENT_ID = '979241689950-cmevnp9vtquaindbuelobiahi3cjba25.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04QeVbgIlU3U-CgYIARAAGAQSNwF-L9IrDJBLjN5i3luHIRmOP16SXzGLpEKRo7M6486-zu5OxMc-von54bRH22YOXmAxuigLcIM';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ceylongemsteam@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });



// const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

  const mailOptions = {
    from:'CeylonGems <ceylongemsteam@gmail.com>',
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  // transporter.sendMail(mailOptions, function (err, info) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(info);
  //   }
  // });
  const result = await transport.sendEmail(mailOptions);
  return result;
}
catch (error) {
  return error;
}
}

sendEmail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));


module.exports = sendEmail;