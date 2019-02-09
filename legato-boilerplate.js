const inquirer = require('inquirer')
const ui = new inquirer.ui.BottomBar()
const fs = require('fs')
const rimraf = require('rimraf')
const packageJson = require('./package.json')

async function legatoBoilerplate() {

    const config = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: `What's the name of your project?`,
            default: 'my-project'
        },
        {
            type: 'input',
            name: 'projectAuthor',
            message: `Who's the author?`,
            default: 'unknown'
        }
    ])

    const {projectName, projectAuthor} = config

    packageJson.name = projectName
    packageJson.author = projectAuthor
    packageJson.description = ''
    packageJson.keywords = []
    packageJson.repository.url = ''
    packageJson.homepage = ''
    packageJson.bugs.url = ''

    packageJson.legatoBoilerplateDependencies.forEach((legatoBoilerplateDependency) => {
        delete packageJson.devDependencies[legatoBoilerplateDependency]
        rimraf.sync(`./node-modules/${legatoBoilerplateDependency}`)
    })

    delete packageJson.legatoBoilerplateDependencies
    delete packageJson.scripts.legatoBoilerplate
    
    fs.unlinkSync('./package-lock.json')
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4))

    const indexFile = fs.readFileSync('./index.html', 'utf8')
    const newIndex = indexFile.replace(/{{projectName}}/g, projectName)
    const webpackProdFile = fs.readFileSync('./webpack.prod.js', 'utf8')

    fs.writeFileSync('./index.html', newIndex, 'utf8')
    fs.writeFileSync('./webpack.prod.js', webpackProdFile, 'utf8')
    fs.unlinkSync('./legato-boilerplate.js')
    rimraf.sync('.git')
    ui.log.write('\x1b[33m[legato (\x1b[34mwebpack\x1b[33m)] \x1b[32mCompleted\x1b[0m')

}

legatoBoilerplate()
