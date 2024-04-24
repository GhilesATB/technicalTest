const {encrypt} = require("../../../../../utils/encryption");
const userModel = require('../../../models/user');
const {matchedData} = require("express-validator");
const {sign} = require("../../../../../utils/tokenHandler");
const {unauthenticated} = require("../../../errors/userError");

exports.login = async (req,res,next) => {
    try {

        const userData = matchedData(req);
        const user = await userModel.findOne({
            where: {
                email: userData.email,
            }
        });

        if (!user) {
            throw unauthenticated("Wrong credentials");
        }

        // Verify password
        if (!encrypt(userData?.password) === user?.password) {
            throw unauthenticated("Wrong credentials");
        }
        // Authenticate user with jwt
        const token = sign({email: user?.email}, null, {expiresIn: "1m"});

        //set same time validity
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).send({'message': 'login successfull'});
    } catch (err) {
        //pass the resulting error to express global errorHandler middlewares
        next(err);
    }
}