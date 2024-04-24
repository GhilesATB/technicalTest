const express = require("express");
const {validateRegister} = require("../app/users/http/requests/RegisterRequest");
const {register} = require("../app/users/http/controllers/authentication/registerController");
const {login} = require("../app/users/http/controllers/authentication/loginController");
const {validateLogin} = require("../app/users/http/requests/loginRequest");
const {refreshToken} = require("../app/users/http/controllers/authentication/refreshToken");

const authRouter = express();

authRouter.post("/refresh", refreshToken);
authRouter.post("/login", validateLogin(), login);
authRouter.post("/register", validateRegister(), register);


module.exports = authRouter;