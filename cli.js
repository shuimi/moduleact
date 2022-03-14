#!/usr/bin/env node
import fs from 'fs'
import {execSync} from 'child_process'
import meow from 'meow'
import chalk from 'chalk'

const log = console.log

const COMMAND = {
    INIT: 'init',
    ADD_MODULE: 'add',
    HELP: 'help',
    EMPTY: undefined,
}

const FLAG = {
    MODULE_NAME: 'm',
    APP_NAME: 'a',
    INCLUDE_APP_CONTEXT: 'c',
    INCLUDE_ROUTING: 'r',
}

const bullet = (symbol) => chalk.blue.underline.bold(symbol)
const commandName = (name) => chalk.green(name)
const flagName = (name) => chalk.hex('#DEADED').bold(name)
const errorMark = (text) => chalk.red(text)


const helpMessage = `
    Commands
	
	     ${bullet('$')} ${commandName('init')} <input>
	          --appName              ${flagName(`-${FLAG.APP_NAME}`)} - set app module name
	          --includeAppContext    ${flagName(`-${FLAG.INCLUDE_APP_CONTEXT}`)} - set app context and basic state management
	          --includeRouting       ${flagName(`-${FLAG.INCLUDE_ROUTING}`)} - add basic routing
	     ${bullet('$')} ${commandName('add')} <input>
	          --moduleName           ${flagName(`-${FLAG.MODULE_NAME}`)} - set module name
	     ${bullet('$')} ${commandName('help')} - show help

`

const unknownCommandMessage = errorMark('Error:') + ' unknown command'


const cli = meow(helpMessage, {
    importMeta: import.meta,
    flags: {
        moduleName: {
            type: 'string',
            alias: FLAG.MODULE_NAME
        },
        appName: {
            type: 'string',
            alias: FLAG.MODULE_NAME
        },
        includeAppContext: {
            type: 'boolean',
            alias: FLAG.MODULE_NAME
        },
        includeRouting: {
            type: 'boolean',
            alias: FLAG.MODULE_NAME
        },
    }
})

const from = (args) => {
    let matchFound = false

    const expect = (command) => ({
        do: (action) => {
            if (args[0] === command) {
                action()
                matchFound = true
            }
            return {
                expect: expect,
                so: (action) => {
                    if (!matchFound){
                        action()
                    }
                }
            }
        }
    })

    return {
        expect: expect
    }
}


const onInit = () => {

    execSync('npm test', {stdio: 'inherit'})

    fs.writeFile('hello.txt', 'text', (error) => {
        if (error) throw error;
        // console.log("Асинхронная запись файла завершена. Содержимое файла:");
        // let data = fs.readFileSync("hello.txt", "utf8");
        // console.log(data);
    })

}

const onAdd = () => {

}

const onHelp = () => {
    log(helpMessage)
}

const onEmptyInput = () => {
    log(helpMessage)
}

const onError = () => {
    log(unknownCommandMessage);
}


from(cli.input)
    .expect(COMMAND.INIT)
        .do(onInit)
    .expect(COMMAND.ADD_MODULE)
        .do(onAdd)
    .expect(COMMAND.HELP)
        .do(onHelp)
    .expect(COMMAND.EMPTY)
        .do(onEmptyInput)
    .so(onError)
