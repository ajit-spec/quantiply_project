const express = require('express')
const router = express.Router()
const apodcontrollers = require('../controller/apod')

//get_data
router.get(
    '/get_data',
    apodcontrollers.check_data,
    apodcontrollers.get_data
)

module.exports = router