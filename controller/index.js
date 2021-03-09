const { postLogin } = require('./auth/login');
const { getMovies, getOneMovie } = require('./movieC');
const { postSignup } = require('./auth/signup');
module.exports = {
    postLogin,
    getMovies,
    getOneMovie,
    postSignup
}