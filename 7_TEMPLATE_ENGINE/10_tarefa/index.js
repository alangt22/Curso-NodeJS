const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const cars = [
    {
        id: 1,
        nome: 'Fit',
        marca: 'Honda',
        motor: "1.4",
        cor: 'Preto',
        km: 20000
    },
    {
        id: 2,
        nome: 'Gol',
        marca: 'VolksWagen',
        motor: "1.0",
        cor: 'Branco',
        km: 50000
    },
    {
        id: 3,
        nome: 'Corolla',
        marca: 'Toyota',
        motor: "2.0",
        cor: 'Prata',
        km: 35000
    },
    {
        id: 4,
        nome: 'Lancer',
        marca: 'Mitsubish',
        motor: "2.0",
        cor: 'Vermelho',
        km: 15000
    }
];


app.get('/', (req, res) => { 
    res.render('home', {cars})
})

app.get('/carro/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(caro => caro.id === carId);

    if (car) {
        res.render('carro', { car });
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

app.listen(5000, () => {
    console.log('App funcionando!')
})