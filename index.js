const express = require("express");
const cors = require("cors");
const config = require("./config");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyparser = require("body-parser");
// const passport = require("passport");
// var Auth0Strategy = require("passport-auth0");
// var session = require("express-session");
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    //jwksUri: `https://myencode.us.auth0.com/.well-known/jwks.json`
    jwksUri: config.AUTH0_JWKS_URI
  }),

  // Validate the audience and the issuer.
  // audience: `https://myencode.us.auth0.com/api/v2/`,
  // issuer: `https://myencode.us.auth0.com/`,
  audience: config.AUTH0_AUDIENCE,
  issuer: config.AUTH0_ISSUER,
  algorithms: ["RS256"]
});
async function runServer() {
  await require("./db").connect();
  server.use(bodyparser.json());
  server.use(
    bodyparser.urlencoded({
      extended: true
    })
  );
  // server.get("/test", (req, res) => {
  //   return res.json({ message: "test is working!" });
  // });

  // server.get("/api/portfolios", (req, res) => {
  //   return res.json({ data: "portfolio test" });
  // });
  // server.use("/api/portfolios", checkJwt, portfoliosRoutes);

  // var sess = {
  //   secret: "Z70UyW3RFP85eMoKYcxwSzYFlbqdi6_mr311_lCMV38qr_4SaijHV_Wqj4bjdXFr",
  //   cookie: { secure: true },
  //   resave: false,
  //   saveUninitialized: true
  // };
  // server.use(session(sess));
  // var auth0 = new Auth0Strategy(
  //   {
  //     domain: "myencode.us.auth0.com",
  //     clientID: "9jddwEUWx4lzVeGaOoFeP0s7TwfRYH9w",
  //     clientSecret:
  //       "Z70UyW3RFP85eMoKYcxwSzYFlbqdi6_mr311_lCMV38qr_4SaijHV_Wqj4bjdXFr",
  //     callbackURL: "http://localhost:3005/api/v1/callback"
  //   },
  //   function(accessToken, refreshToken, extraParams, profile, done) {
  //     return done(null, profile);
  //   }
  // );
  // passport.use(auth0);
  // server.use(passport.initialize());
  // server.use(passport.session());
  server.use("/api/portfolios", checkJwt, portfoliosRoutes);
  const PORT = parseInt(process.env.PORT, 10) || 3001;
  server.listen(PORT, err => {
    if (err) console.error(err);
    console.log("Server ready on port:", PORT);
  });
}
runServer();
const server = express();
var corsOptions = {
  origin: "http://localhost:3005",
  methods: "GET, PUT",
  credentials: true
};
server.use(cors(corsOptions));
const portfoliosRoutes = require("./Routes/portfolio");
