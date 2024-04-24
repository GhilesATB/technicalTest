const connection = require('./sequilize');

exports.connect = async () => {
    try {
        await connection.authenticate();
    } catch (error) {
        console.error('Error :', error);
    }
};