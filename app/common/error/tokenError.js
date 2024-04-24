const tokenExpired = (message) => {

    const err = new Error(message ?? "token expired");
    err.code = "token-expired";
    err.status = 401;

    return err;
};

module.exports = {
    tokenExpired,
};