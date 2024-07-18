const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizedUser } = require("../services/common");
const SECRET_KEY = 'SECRET_KEY'
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizedUser(doc), () => { //this also calls serializer and adds session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizedUser(doc), SECRET_KEY);
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  res.json({status:'success',user:req.user});
};
