const express = require('express')
const app = express()
const PORT = 3000
const Controller = require('./controller/index')
const ControllerUser = require('./controller/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboarjhkouyt',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/jobs/add', Controller.addJobForm)
app.post('/jobs/add', Controller.addJob)
app.get('/jobs/search', Controller.jobSearch)
app.get('/jobs/delete/:id', Controller.deleteJob)
app.get('/jobs/edit/:id', Controller.editJobForm)
app.get('/jobs', (req, res, next) => {
    console.log(req.session.email)
    if (req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Tidak Bisa Masuk, harus login dulu'
        res.redirect('/login')
    }
}, Controller.jobList)


app.get('/user/:username', Controller.postedJobs)
app.get('/register', ControllerUser.registerGet)
app.post('/register', ControllerUser.registerPost)
app.get('/login', ControllerUser.loginGet)
app.post('/login', ControllerUser.login)
app.get('/logout', ControllerUser.logout)




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})