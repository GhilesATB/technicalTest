
const UserModel = require('../../models/user');
const {verify, sign} = require("../../../../utils/tokenHandler");
const {unauthenticated} = require("../../errors/userError");

module.exports = async (req, res, next) => {

    const token = req.cookies?.jwt;
    const refreshToken = req.cookies?.refreshToken;

    try {

        const user = await _authenticateFrom(token);
        req.user = user;

        next();

    } catch (err) {

        if(err.name === 'TokenExpiredError' && refreshToken) {
            try {
                const user = await _authenticateFrom(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const token = sign({email: user?.email}, null, {expiresIn: "1m"});

                res.cookie('jwt', token, {
                    httpOnly: true,
                    sameSite: 'None', secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                return res.status(204).send({});

            } catch(err) {
                next(err);
            }
        }

        next(err);
    }
}

async function _authenticateFrom(token, secret = null) {
    const payload = verify(token);

    const user = await UserModel.findOne({
        where: {
            email: payload?.email
        }
    });

    if (!user) {
        throw unauthenticated()
    }

    return user;

}