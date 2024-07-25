
const passport = require('passport')
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