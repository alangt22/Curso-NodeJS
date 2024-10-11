const express = require('express')
const app = express()
const path = require('path')
const rotas = require('./rotas')
const port = 5000
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use(express.json())
app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

app.use('/rotas', rotas)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/teste.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})