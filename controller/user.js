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
                let cred = data.dataValues
                if (data) {

                    if (compare(password, data.password)) {
                        req.session.isLogin = true
                        req.session.username = cred.username
                        req.session.email = cred.email
                        req.session.userid = cred.id
                        res.redirect('/')
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

    static logout(req, res) {
        delete req.session.isLogin
        res.redirect('/login')

    }

    static postedJobs(req, res) {
        //const username = req.params.username
        const id = req.session.userid

        Job.findAll({
            include: [
                { model: Tag }
            ], where: { user_id: id}
        })
            .then(data => {
                res.render('jobList.ejs', { data })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = ControllerUser