#!/usr/bin/env node

import meow from 'meow'

import { COMMAND, FLAG, helpMessage } from './moduleact.module/moduleact.config/index.js'
import { from } from './moduleact.module/moduleact.services/index.js'
import { createCommandHandlersService } from './moduleact.module/moduleact.services/command-handlers.service.js'


const cli = meow(helpMessage, {
    importMeta: import.meta,
    flags: {
        moduleName: {
            type: 'string',
            alias: FLAG.MODULE_NAME
        },
        appName: {
            type: 'string',
            alias: FLAG.APP_NAME
        },
        includeAppContext: {
            type: 'boolean',
            alias: FLAG.INCLUDE_APP_CONTEXT
        },
        includeRouting: {
            type: 'boolean',
            alias: FLAG.INCLUDE_ROUTING
        },
        declarativeStructure: {
            type: 'string',
            alias: FLAG.DECLARATIVE_STRUCTURE
        },
        useFirebase: {
            type: 'boolean',
            alias: FLAG.USE_FIREBASE
        },
    }
})

const CommandHandlers = createCommandHandlersService(cli)

from(cli.input)
    .expect(COMMAND.INIT)
    .do(CommandHandlers.onInit)
    .expect(COMMAND.ADD_MODULE)
    .do(CommandHandlers.onAdd)
    .expect(COMMAND.HELP)
    .do(CommandHandlers.onHelp)
    .expect(COMMAND.EMPTY)
    .do(CommandHandlers.onEmptyInput)
    .so(CommandHandlers.onError)
