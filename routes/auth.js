const { Router } = require('express');
const router = Router();
const { postLogin, postSignup } = require('../controller');

router
    .post('/login', postLogin)
    .post('/signup', postSignup)

module.exports = router;