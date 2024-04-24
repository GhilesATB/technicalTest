const {sign,verify} = require("../../../../../utils/tokenHandler");


exports.refreshToken = function(req, res, next) {
    try {

        // Destructuring jwt from cookie
        const jwt = req.cookies?.jwt;

        // Verifying jwt token
        const data = verify(jwt, null,{ignoreExpiration: true});

        const refreshToken = sign({
            email: data.email
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: 60 * 1000 //10m
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000 //1d
        });

        return res.status(204).send({});

    } catch(err) {

        next();
    }

}
