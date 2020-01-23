const jwt = require("jsonwebtoken");

// @desc        To verify token
// @access      Public
module.exports = {
  verifyToken: function(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    if (!req.headers.authorization || token === "null") {
      return res.status(401).send("unauthorized request");
    }
    jwt.verify(token, "secretKey", (err, data) => {
      if (err) {
        return res.status(401).send("unauthorized request");
      } else {
        req._id = data.subject;
        next();
      }
    });
  }
};
