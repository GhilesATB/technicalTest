const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
dotenv.config();
const db = require('./config/database/index');
const routes = require("./routes/index");
const {ErrorHandler} = require("./app/common/middlewares/errorHandler");
const {corsOptions} = require("./config/cors/cors");
const {routeNotFound} = require("./app/common/middlewares/routeNotFound");
const app = express();

const port = process.env.PORT || 3000;

//connect to database
db.connect();

// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

//routes call
app.use("/", routes);
app.get('/', ((req, res) => {
    res.send("Server running");
}))

//global error handler
app.use(ErrorHandler);
//route not found handler
app.use(routeNotFound);

app.listen(port, () => {
    console.log(`Server active on http://localhost:${port}!`);
})