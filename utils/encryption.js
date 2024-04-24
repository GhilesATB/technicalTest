const crypto = require("crypto");

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
exports.encrypt = (input) => {
    // We will hash the password using SHA256 Algorithm before storing in the DB
    // Creating SHA-256 hash object
    const hash = crypto.createHash("sha256");
    // Update the hash object with the string to be encrypted
    hash.update(input);
    // Get the encrypted value in hexadecimal format
    return hash.digest("hex");
};