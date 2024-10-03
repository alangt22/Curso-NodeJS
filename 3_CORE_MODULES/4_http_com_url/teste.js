const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
    const url = require('url').parse(req.url, true)
    const name = url.query.name
    const email = url.query.email

    res.statusCode = 200
    res.setHeader('content-Type', 'text/html')

    if(!name && !email) {
        res.end('<h1>Preencha seu nome:</h1><form method="GET"><input type="text" name="name"/><input type="text" name="email" /><input type="submit" value="Enviar" /></form>')
    }else {
        res.end(`<h1>Seja bem vindo ${name}!</h1>
            <h2>E-mail: ${email}</h2`)
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})