const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
const api = require('./router/routePath')
const db = require('./db/dbConncet')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(api)

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    db.once('open', () => {
        console.log('db works')
    })
    console.log(`we have fun on http://localhost:${port}`)
})
