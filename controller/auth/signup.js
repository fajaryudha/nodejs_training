const { User } = require('../../models');

module.exports.postSignup = (req, res, next) => {
    //validation
    const validation = User.validate(req.body);

    if (validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 404;
        return next(error)
    }
    const user = new User(req.body);

    user.checkExistence()
        .then(result => {
            if (result.check) {
                const error = new Error(result.message);
                error.statusCode = 409;
                return next(error);
            }
            user.save((err) => {
                console.log(err)
                if (err) {
                    return next(createError(500))
                }
                res.status(201).json(
                    {
                        message: "User has been succes created"
                    }
                );
            });
        }).catch(err => {
            next(createError(500));
        })
}

