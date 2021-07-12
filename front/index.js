const express = require('express')
const mongoose = require('mongoose')
const createserver = require('./app') // new
require('dotenv/config')

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        const app = createserver() // new
        app.listen(8000, () => {
            console.log('Server has started!')
        })
    })
    .catch((err) => console.log(err))
