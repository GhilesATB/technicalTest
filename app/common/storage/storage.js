const util = require("util");
const fs = require("fs");

exports.writeFileAsync = util.promisify(fs.writeFile);

exports.unlinkAsync = util.promisify(fs.unlink);

exports.fileExistsSync = (path) => fs.existsSync(path)

exports.makeStoragePath = (file, path) => file ? `${path}/${Date.now()}-${file.originalname}` : null;