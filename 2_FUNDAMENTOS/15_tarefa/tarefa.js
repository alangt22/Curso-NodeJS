const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
    {
        name: 'nome',
        message: 'Qual seu o nome?',
    },
    {
        name: 'idade',
        message: 'Qual sua idade?',
    }

])
.then((answers) => {
    const idade = parseInt(answers.idade, 10);
    if (isNaN(idade)) {
        console.log(chalk.bgRed("Digite apenas números para a idade."));
    } else {
        console.log(chalk.bgYellow.black(`Meu nome é ${answers.nome} e tenho ${idade} anos`));
    }
    
})
.catch((err) => {
    console.error(chalk.bgRed("Ocorreu um erro durante a execução."), err);
});