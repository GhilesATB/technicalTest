const {validate} = require("../../../common/middlewares/requestValidation");
const {body} = require("express-validator");
const {allowedMimeTypes, maxSize} = require("../../../../config/files/upload");

const validateFile = (req) => {
    if (!allowedMimeTypes.includes(req?.files[0].mimetype)) {
        throw Error("Invalid format");
    }

    if (req?.files[0].size > maxSize) {
        throw new Error("max file size exceeded");
    }
}

const productRules = [
    body('name').trim().isLength({min: 3}).escape().withMessage('Please provide a product name with at least 3 characters'),
    body('description').trim().isLength({min: 6}).escape().withMessage('Please provide a description with at least 6 characters'),
    body('category').trim().isLength({min: 3}).escape().withMessage('Please provide a category with at least 3 characters'),
    body('price').notEmpty().withMessage('Price is required')
        .toFloat().isFloat({min: 0}).withMessage('Price must be a positive number')
        .isDecimal({decimal_digits: '1,2'}).withMessage('Price must have at most two decimal places'),
];

exports.validateProduct = () => {
    return validate([
        ...productRules,
        body("image").custom((value, {req}) => {
            if (!req?.files[0]) {
                throw Error("image is required");
            }

            validateFile(req);

            return true;
        }),
    ]);
};

exports.validateProductUpdate = () => {
    return validate([
        ...productRules,
        body("image").custom((value, {req}) => {

            if (!req?.files[0]) {
                return true;
            }

            validateFile(req);

            return true;
        }),
    ]);
};