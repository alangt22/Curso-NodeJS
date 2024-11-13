const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('nodemvc', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL')
    
} catch (error) {
  console.log(`nao foi possivel conectar ${error}`)
}

module.exports = sequelize