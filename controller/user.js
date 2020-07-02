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
        const error = req.session.error;
        delete req.session.error
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
                        req.session.isLogin = true
                        res.redirect('/jobs')
                    } else {
                        req.session.isLogin = false
                        req.session.error = 'Password salah';
                        res.redirect('/login')
                    }

                } else {
                    req.session.isLogin = false
                    req.session.error = 'Email atau Password salah';
                    res.redirect('/login')
                }

            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res){
        delete req.session.isLogin
        res.redirect('/login')
        
    }
}

module.exports = ControllerUser