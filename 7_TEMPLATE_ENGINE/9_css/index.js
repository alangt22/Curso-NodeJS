const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res) => {
    const items = ["item a", "item b", "item c"]

    res.render('dashboard', {items})
}) 

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender Node.js...',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender Node.js',
            category: 'JavaScript',
            body: 'Este artigo vai te ajudar a aprender Node.js...',
            comments: 10
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Este artigo vai te ajudar a aprender...',
            comments: 8
        },
        {
            title: 'Aprender Python',
            category: 'Python',
            body: 'Este artigo vai te ajudar a aprender...',
            comments: 7
        },
        {
            title: 'Aprender C++',
            category: 'C++',
            body: 'Este artigo vai te ajudar a aprender...',
            comments: 3
        }
    ]

    res.render('blog', {posts})
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