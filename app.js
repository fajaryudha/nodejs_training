const express = require('express');
const { logger } = require('./configuration');
const { middleware, auth } = require('./middlewares');
const createError = require('http-errors');
const app = express();
const routes = require('./routes');
//middlewares
middleware(app);

process.on('unhandledRejection', (reason) => {
    // logger(reason);
    console.log(reason)
    process.exit(1);
})

//route
routes(app);

app.use((req, res, next) => {
    const error = createError(404);
    next(error);
});

app.use((error, req, res, next) => {
    logger.error(error.message);
    res.status = error.statusCode;
    res.json({
        message: error.message
    });
});

module.exports = app;