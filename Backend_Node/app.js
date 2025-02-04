const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 3500

const apiRoute = require('./routes/api.route')
const authRoute = require('./routes/auth.route')

app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/', authRoute)
app.use('/todo', apiRoute)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})