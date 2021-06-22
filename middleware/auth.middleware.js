var jwt = require("jsonwebtoken");

module.exports.verify = function(req, res, next) {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(403).send();
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).send();
  }
};
