const {matchedData} = require("express-validator");
const {encrypt} = require("../../../../../utils/encryption");
const {userAlreadyExists} = require("../../../errors/userError");
const {roles} = require("../../../enums/role");
const userModel = require('../../../models/user');
const role = require('../../../models/role');

exports.register = async (req, res, next) => {

    try {

        const userData = matchedData(req);
        const user = await userModel.findOne({
            where: {
                email: userData.email
            }
        });

        if (user) {
            throw userAlreadyExists();
        }

        const encryptedPassword = encrypt(userData?.password);
        const guestRole = await role.findOne({where : {name: roles.guest}});
        await userModel.create({...userData, password: encryptedPassword, role_id: guestRole.id});

        return res.status(201).send({"message": "Registration successful"});

    } catch (err) {
        //pass the resulting error to express global errorHandler
        next(err);
    }
}