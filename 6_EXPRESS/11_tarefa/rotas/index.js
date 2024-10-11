const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/t1', (req, res) => {
    res.sendFile(`${basePath}/teste.html`)
})

router.get('/t2', (req, res) => {
    res.sendFile(`${basePath}/teste2.html`)
})

module.exports = router