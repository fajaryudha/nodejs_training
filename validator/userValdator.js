const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required().min(3).max(10),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).message('You password must be at least 8 characters and contain at least one Uppercase letter, one lowercase latter, one number and one spesial character').required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
})

const logSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    schema,
    logSchema
};