require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(value => {
        console.log(`db connected`)
    }).catch(reason => {
    console.log(reason)
})
const cors = require('cors')
const apodroutes = require('./routes/apod')
const path = require('path')
app.listen(process.env.PORT)

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(apodroutes)

app.use((req, res) => {
    return res.json(
        {
            status: 0,
            msg: '404 error'
        }
    )
})