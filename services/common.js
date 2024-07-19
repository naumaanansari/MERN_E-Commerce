
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
  token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTk0NjMwNWQ1NzU0Nzk0M2U0M2NlOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIxMzMwODA5fQ.1I_h-lhOqhRHEksSfMNlb0i4DxnOgAeFy09ZJvm1X5o"
  return token;
};