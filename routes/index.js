const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./products");
const auth = require('../app/users/http/middlewares/auth');
const router = express();

router.use("/api/v1/", authRoutes);
router.use("/api/v1/", auth, productRoutes);

module.exports = router;