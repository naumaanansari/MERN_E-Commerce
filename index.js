const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

//Passport Js Variables
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//Cors Variables
const cors = require("cors");
const { User } = require("./model/User");
const server = express();

const SECRET_KEY = "SECRET_KEY";

//Jwt Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; // Should Be in code

// Middlewares
// This Should Be Used On the top of the All Middlewares
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: "X-Total-Count",
  })
);

//Importing Routers
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const { isAuth, sanitizedUser } = require("./services/common");

server.use(express.json()); //to parse req.body
server.use("/products", isAuth(), productsRouter.router); // we can also use jwt token
server.use("/categories",isAuth(), categoriesRouter.router);
server.use("/brands",isAuth(), brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart",isAuth(), cartRouter.router);
server.use("/orders",isAuth(), orderRouter.router);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "Invalid Credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid Credentials" });
          }
          const token = jwt.sign(sanitizedUser(user), SECRET_KEY);

          done(null, token); //This lines sends to serialize
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
//Jwt Strategies
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {

    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizedUser(user)); //this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// This creates session variable req.user on being called from callback
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);

  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});
// This changes session variable req.user on being called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);

  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wecommerce");
  console.log("database connected");
}

server.listen(8080, () => {
  console.log("Server Started");
});
