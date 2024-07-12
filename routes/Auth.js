const express = require('express');
const { createUser } = require('../controller/User');
const { loginUser } = require('../controller/Auth');

const router = express.Router();

// /auth is already added in base path
router.post('/signup', createUser)
      .post('/login', loginUser)


exports.router = router;