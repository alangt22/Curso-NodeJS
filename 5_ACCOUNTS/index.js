// modulos externos
const inquirer = require("inquirer")
const chalk = require("chalk")

// modulos internos
const fs = require("fs")

operations()

function operations() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Transferencia',
                'Sair'
            ],
        },
    ])
    .then((answer) => {
        const action = answer['action']

        if(action === 'Criar Conta') {
           createAccount() 
        } else if(action === 'Depositar') {
            deposit()
        } else if(action === 'Consultar Saldo') {
            getAccountBalance()
        } else if(action === 'Sacar') {
            withdraw()
        } else if(action === 'Transferencia'){
            transfer()
        } else if(action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Account!'))
            process.exit()
        }
       
    })
    .catch((err) => console.log(err))
}

// Create acount
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'))
            buildAccount()
            return
        }
        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}', 
            function (err) {
                console.log(err)
            },
        )
        
        console.log(chalk.green('Parabéns, a sua conta foi criada!'))
        operations()
       
    })
    .catch((err) => console.log(err))
}

// add an amounr to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']
        // verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            },
        ]).then((answer) => {
            
            const amount = answer['amount']
            // add an amount
            addAmount(accountName, amount)
            operations()

        }).catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}


// função para verificar
function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, tente outro nome!'))
        return false
    }
    return true
}


function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde! '))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        },
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    
    return JSON.parse(accountJSON)
}

//show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        // verify if account exists
         if(!checkAccount(accountName)) {
            return getAccountBalance()
         }

         const accountData = getAccount(accountName)

         console.log(chalk.bgBlue.black(
            `Olá, o saldo da sua conta é de R$${accountData.balance}`,
        ),
    )
    operations()

    }).catch((err) => console.log(err))
}

// withdraw  an amount from user account
function withdraw() {
    
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            removeAmount(accountName, amount)
            

        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function removeAmount (accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(
            chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
        )
        return withdraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponivel!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta`))
    operations()
}


function transfer() {
    inquirer.prompt([
        {
            name: 'fromAccount',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const fromAccount = answer['fromAccount'];

        // Verifica se a conta de origem existe
        if (!checkAccount(fromAccount)) {
            return transfer();
        }

        inquirer.prompt([
            {
                name: 'toAccount',
                message: 'Para qual conta deseja transferir?'
            }
        ]).then((answer) => {
            const toAccount = answer['toAccount'];

            // Verifica se a conta de destino existe
            if (!checkAccount(toAccount)) {
                return transfer();
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto você deseja transferir?'
                }
            ]).then((answer) => {
                const amount = parseFloat(answer['amount']);

                // Verifica se o valor é válido
                if (isNaN(amount) || amount <= 0) {
                    console.log(chalk.bgRed.black('Valor inválido!'));
                    return transfer();
                }

                // Realiza a transferência
                const fromAccountData = getAccount(fromAccount);
                if (fromAccountData.balance < amount) {
                    console.log(chalk.bgRed.black('Saldo insuficiente para transferência!'));
                    return transfer();
                }

                // Remove o valor da conta de origem
                fromAccountData.balance -= amount;
                fs.writeFileSync(`accounts/${fromAccount}.json`, JSON.stringify(fromAccountData));

                // Adiciona o valor à conta de destino
                const toAccountData = getAccount(toAccount);
                toAccountData.balance += amount;
                fs.writeFileSync(`accounts/${toAccount}.json`, JSON.stringify(toAccountData));

                console.log(chalk.green(`Transferência de R$${amount} de ${fromAccount} para ${toAccount} realizada com sucesso!`));
                operations();
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
}
