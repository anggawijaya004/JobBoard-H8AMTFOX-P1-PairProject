const express = require('express')
const app = express()
const PORT = 3000
const Controller = require('./controller/index')
const ControllerUser = require('./controller/user')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('home.ejs')
})

app.get('/jobs/add', Controller.addJobForm)
app.post('/jobs/add', Controller.addJob)
//app.get('/jobs', Controller.jobList)
app.get('/jobs/delete/:id', Controller.deleteJob)

app.get('/jobs', (req, res, next) =>{
    if (req.app.locals.isLogin){
        next()
    }else{
        req.app.locals.error = 'Tidak Bisa Masuk, harus login dulu'
        res.redirect('/login')
    }
}, Controller.jobList)

app.get('/register', ControllerUser.registerGet)
app.post('/register', ControllerUser.registerPost)
app.get('/login', ControllerUser.loginGet)
app.post('/login', ControllerUser.login)










app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})