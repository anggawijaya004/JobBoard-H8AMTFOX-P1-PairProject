const { User } = require('../models');
const { compare } = require('../helper/bcrypt');

class ControllerUser {
    static registerGet(req, res) {
        res.render('register')
    }

    static registerPost(req, res) {
        let input = req.body;
        let obj = {
            username: input.username,
            email: input.email,
            password: input.password
        }
        User.create(obj)
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
                console.log(err)
            })
    }

    static loginGet(req, res) {
        const error = req.app.locals.error;
        delete req.app.locals.error
        res.render('login', { error })
    }

    static login(req, res) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(data => {
              
                if (data) {
                    console.log(password)
                    console.log(data.password)
                    console.log(compare(password, data.password))
                    if (compare(password, data.password)) {
                        req.app.locals.isLogin = true
                        res.redirect('/jobs')
                    } else {
                        req.app.locals.isLogin = false
                        req.app.locals.error = 'Password salah';
                        res.redirect('/login')
                    }

                } else {
                    req.app.locals.isLogin = false
                    req.app.locals.error = 'Email atau Password salah';
                    res.redirect('/login')
                }

            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser