const jwt = require("jsonwebtoken");

//TODO : move expiration tu function call
exports.sign = (payload, secret, options) => jwt.sign(payload, secret ?? process.env.JWT_SECRET, options);

//TODO : check token expiary
exports.verify = (payload, secret, options) => jwt.verify(payload, secret ?? process.env.JWT_SECRET, options);