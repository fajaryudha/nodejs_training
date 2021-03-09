const { dbCon } = require('../configuration');
const { ObjectID } = require('bson');
const createError = require('http-errors');

module.exports.getMovies = (req, res, next) => {
    // console.log(req.user);
    const pageNum = parseInt(req.params.page);
    if (isNaN(pageNum)) {
        return next(createError(400));
    }
    const movieToSkip = (pageNum - 1) * 10;

    dbCon('movies', async (db) => {
        try {

            const movies = await db.find({}).skip(movieToSkip).limit(10).toArray();
            res.json(movies);
        } catch (err) {
            return next(createError(500))
        }
    })
};

module.exports.getOneMovie = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return next(createError(400));
    }
    const _id = new ObjectID(req.params.id);
    dbCon('movies', async (db) => {
        try {
            const movie = await db.findOne({ _id });
            if (!movie) {
                return next(createError(404));
            }
            res.json(movie);
        } catch (err) {
            return next(createError(500))
        }
    })
};