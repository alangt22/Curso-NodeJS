const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    const items = ["item a", "item b", "item c"]

    res.render('dashboard', {items})
}) 

app.get('/', (req, res) => {
    const user = {
        name: 'Alan',
        surname: 'Nunes',
        age: 28 
    }

    const palavra = 'Testando'

    const auth = false
    
    const approved = false

    res.render('home', {user: user, palavra, auth, approved})
})

app.listen(3000, () => {
    console.log('App funcionando!')
})