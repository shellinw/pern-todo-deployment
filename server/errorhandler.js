const errorhandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";

    if (err.message == "NotFound") {
        status = 404;
        message = "Data not found";
    }
    if (err.name == "SequelizeValidationError") {
        status = 400;
        message = err.errors[0].message;
    }
    res.status(status).json({ message });
};
module.exports = errorhandler;
