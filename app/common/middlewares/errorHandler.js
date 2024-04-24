exports.ErrorHandler = (err, req, res, next) => {

    const status = err?.status ?? 500;
    const message = err?.message ?? "Server Error";
    const code = err?.code ?? "Server Error";
    const data = {code: code, message: message};

    if(process.env.NODE_ENV !== 'production') {
        data.stack = err.stack;
    }

    res.status(status).json(data);
};

