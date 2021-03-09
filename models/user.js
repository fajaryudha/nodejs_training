const { dbCon } = require('../configuration');
const { userValidator, logSchema } = require('../validator');
const { hashSync, compareSync } = require('bcryptjs');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    }

    save(cb) {
        dbCon('users', async (db) => {
            try {
                const hashedPass = hashSync(this.userData['password'], 12);
                this.userData['password'] = hashedPass;
                await db.insertOne(this.userData);
                cb();
            } catch (error) {
                cb(error)
            }
        })
    }

    checkExistence() {
        return new Promise((resolve, reject) => {
            dbCon('users', async (db) => {
                try {
                    const user = await db.findOne({ '$or': [{ username: this.userData['username'] }, { email: this.userData['email'] }] });
                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else if (this.userData['username'] === user.username) {
                        resolve({
                            check: true,
                            message: 'this username alredy in use'
                        })

                    } else if (this.userData['email'] === user.email) {

                        console.log(this.userData['email'])
                        resolve({
                            check: true,
                            message: 'this email alredy in use'
                        })

                    }
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    static validate(userData) {
        return userValidator.validate(userData);
    }

    static login(userData) {
        return new Promise((resolve, reject) => {
            const validation = logSchema.validate(userData);
            if (validation.error) {
                const error = new Error(validation.error);
                error.statusCode = 400;
                return resolve(error);
            }

            dbCon('users', async (db) => {
                try {
                    //find user
                    const user = await db.findOne({ '$or': [{ 'username': userData['username'] }, { 'email': userData['username'] }] }, { projection: { username: 1, password: 1 } });
                    if (!user || !compareSync(userData['password'], user.password)) {
                        const error = new Error('Please enter valid username or password');
                        error.statusCode = 404;
                        return resolve(error);
                    }

                    resolve(user);

                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
// User
//     .login({
//         username: 'fajr',
//         password: 'Beldok-87'
//     })
//     .then(res => {
//         console.log(res);
//     })

module.exports = User