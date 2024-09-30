const chalk = require('chalk')

const nota = 5
 
if (nota >= 7 ){
    console.log(chalk.green.bold('Parabens! Você esta aprovado!'))
} else {
    console.log(chalk.bgRed.yellow.bold('Você precisa fazer a prova de recuperação!'))
}