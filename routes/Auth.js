const express = require('express');
const { loginUser, checkUser, createUser } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

// /auth is already added in base path
router.post('/signup', createUser)
      .post('/login',passport.authenticate('local'), loginUser )
      .get('/check', checkUser)



exports.router = router; 