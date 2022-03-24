import {
    askQuestion,
    createDescriptorGenerator,
    createFilesService,
    createNpmService,
    log,
    randString,
    TextFormatService
} from "./index.js";
import { FLAG, helpMessage, unknownCommandMessage } from "../moduleact.config/index.js";


const blueBoldText = TextFormatService.blueBoldText
const pinkBoldText = TextFormatService.pinkBoldText
const greenText = TextFormatService.greenText
const redText = TextFormatService.redText


const DEFAULT_APP_NAME = 'app'
const DEFAULT_TEMPLATES_DIRECTORY = './moduleact.templates'


export const createCommandHandlersService = ( cli ) => {

    const appDescriptor = {
        appName: cli.flags.appName ? TextFormatService.toKebabCase(cli.flags.appName) : DEFAULT_APP_NAME,
        useFirebase: cli.flags.useFirebase,
        includeAppContext: cli.flags.includeAppContext,
        includeRouting: cli.flags.includeRouting,
    }

    const descriptorFactory = createDescriptorGenerator('Root')
    const NpmService = createNpmService(appDescriptor)
    const FilesService = createFilesService(appDescriptor, DEFAULT_TEMPLATES_DIRECTORY)

    const parseStructureDeclaration = (filePath) => {
        //Todo: 1) check if file exist
        //Todo: 2) parse file
        //Todo: 3) check if all needed fields exist
        //Todo: 4) check if all needed fields correct
        //Todo: 5) correct fields that can be corrected
        //Todo: 6) return descriptor
        //Todo: 7) or throw error
        throw Error(`01: File not found`)
        throw Error(`02: Parse error`)
        throw Error(`03A: Required member A not exist`)
        throw Error(`03B: Required member B not exist`)
        throw Error(`04A: Required member A has incorrect format`)
        throw Error(`04B: Required member B has incorrect format`)
    }

    const initPipeline = () => {

        FilesService.clearSrcDirectory()

        //TODO:
    }

    const onInit = async () => {

        const confirmationString = randString(6)

        if (cli.flags.declarativeStructure) {
            let filePath = cli.flags.declarativeStructure
            try {
                parseStructureDeclaration(filePath)
            }
            catch (parsingError) {
                log(redText(`Parsing Error ${parsingError.message}. Process aborted.`))
                return
            }
        }
        else {

            if (cli.flags.appName) {
                log(greenText(`App name specified: ${ pinkBoldText(appDescriptor.appName) }.`))
            }
            else {
                log(greenText(`App name is not specified, the default name is ${ pinkBoldText('app') }.`))
            }

            if (appDescriptor.useFirebase) {
                log(greenText(`Flag -${pinkBoldText(FLAG.USE_FIREBASE)} specified: ${ pinkBoldText('firebase') } dependencies and services will be added.`))
            }
            if (appDescriptor.includeAppContext) {
                log(greenText(`Flag -${pinkBoldText(FLAG.INCLUDE_APP_CONTEXT)} specified: ${ pinkBoldText('state management') } dependencies and services will be added.`))
            }
            if (appDescriptor.includeRouting) {
                log(greenText(`Flag -${pinkBoldText(FLAG.INCLUDE_ROUTING)} specified: ${ pinkBoldText('routing') } dependencies and services will be added.`))
            }
        }

        log(redText(`This command will delete any files in project's ./src directory, so be careful using it.`))
        log(redText(`Type "${ pinkBoldText(confirmationString) }" to proceed or (CTRL+C) to abort. `))

        const answer = await askQuestion("Confirmation: ")


        if (confirmationString === answer) {
            try {
                log(blueBoldText(`Initialization...`))
                initPipeline()
            }
            catch (InitError) {
                log(redText(InitError.message))
            }
        }
        else {
            log(redText(`Error. Process aborted.`))
        }

    }

    const onAdd = async () => {

        //TODO: check if react installed
        //TODO: check if project initialized

        let answer = ''

        if (!cli.flags.moduleName) {
            log(greenText(`Next time you can specify -${ FLAG.MODULE_NAME } flag to define module name.`))
            answer = await askQuestion("Module name: ")
        } else {
            answer = cli.flags.moduleName
        }

        do {
            if (!answer) {
                answer = await askQuestion("Module name: ")
            }

            if (!TextFormatService.isKebabCase(answer)) {
                log(greenText(`You should specify module name in ${ pinkBoldText('kebab-case') } according to accepted convention `))
                answer = ''
            } else {
                break
            }

        } while (true)

        let moduleName = answer
        let moduleFileName = moduleName + '.module'
        let componentName = TextFormatService.toPascalCase(answer) + 'Root'

        let moduleDescriptor = descriptorFactory(moduleName, moduleName)
        log(moduleDescriptor)

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

    return {
        onInit,
        onAdd,
        onHelp,
        onEmptyInput,
        onError
    }
}
