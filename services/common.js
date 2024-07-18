
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
  token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTk2NjJhYTcwMTg5YmVhNTE5YjgxZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTMyOTQxOX0.kbYBXbi4bnjpxG_EusZFk2D_i2vkqf0O3k7BAMbQPmg'
  return token;
};