const {validate} = require("../../../common/middlewares/requestValidation");
const {body} = require("express-validator");

exports.validateRegister = () => {

    return validate([
        //must be a valid email
        body('email').isEmail().withMessage('Please provide a valid email address'),
        // password must be at least 6 characters long
        body('password').notEmpty().isLength({min: 6}).escape().withMessage('Please provide a password with at least 6 characters'),
    ]);
};