const authRouter = require('./auth');
const movieRouter = require('./movie');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use(movieRouter);
    
    app.get('/', (req, res, next) => {
        res.send('Welcom Home Page');
    });

    app.get('/user/:id/:postId', (req, res, next) => {
        console.log(req.query);
        console.log(req.params);
        res.send('Welcome to user page 1');
    });
};