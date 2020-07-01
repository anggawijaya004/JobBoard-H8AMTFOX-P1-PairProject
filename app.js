const express = require('express')
const app = express()
const PORT = 3000
const Controller = require('./controller/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/jobs/add', Controller.addJobForm)
app.post('/jobs/add', Controller.addJob)
app.get('/jobs', Controller.jobList)










app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})