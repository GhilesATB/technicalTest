const unauthenticated = (message) => {

    const err = new Error(message ?? "Unauthenticated");
    err.code = "unauthenticated";
    err.status = 401;

    return err;
};

const unauthorized = (message) => {

    const err = new Error(message ?? "Unauthorized");

    err.code = "unauthorized";
    err.status = 403;

    return err;
};

const userAlreadyExists = (message) => {

    const err = new Error(message ?? "user already exists");

    err.code = "user-already-exists";
    err.status = 400;

    return err;
};

module.exports = {
    unauthenticated,
    unauthorized,
    userAlreadyExists
};