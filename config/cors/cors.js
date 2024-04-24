const corsOptions = {

    "origin": process.env.CORS_ORIGIN,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}

exports.corsOptions = corsOptions;