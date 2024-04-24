const productNotFoundError = (message) => {

    const err = new Error(message ?? "Product not found");

    err.code = "resource-not-found";
    err.status = 404;

    throw err;
};

const productAlreadyExists = (message) => {

    const err = new Error(message ?? "Product already exists");

    err.code = "resource-Already-exists";
    err.status = 400;

    return err;
};

module.exports = {productNotFoundError, productAlreadyExists};