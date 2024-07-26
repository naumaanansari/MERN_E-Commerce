
const passport = require('passport');
const nodemailer = require('nodemailer');


//Email Actions 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "nomaanansari1115@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
});


exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};
exports.sanitizedUser = (user) => {
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  //TODO: This is temporary token for testing without cookie
  return token;
};

//send mail with defined transport object
exports.sendMail = async function({to, subject,text,html}){
  
    let info = await transporter.sendMail({
      from: '"E-Commerce" <nomaanansari1115@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
    return info;
    
    
}