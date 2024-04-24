const multer = require('multer');

exports.parseMultipart = multer().any();