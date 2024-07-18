const express = require('express')


exports.isAuth = (req, res, done) => {
  if (req.user) {
    done();
  } else {
    res.send(401);
  }
};
exports.sanitizedUser = (user) => {
    return {id:user.id, role:user.role}
}
 