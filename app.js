const express = require('express')
const app = express()
const PORT = 3000
const Controller = require('./controller/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))












app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})