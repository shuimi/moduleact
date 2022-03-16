import { TextFormatService } from "../moduleact.services/index.js";

const blueBoldText = TextFormatService.blueBoldText
const pinkBoldText = TextFormatService.pinkBoldText
const greenText = TextFormatService.greenText
const redText = TextFormatService.redText


export const COMMAND = {
    INIT: 'init',
    ADD_MODULE: 'add',
    HELP: 'help',
    EMPTY: undefined,
}

export const FLAG = {
    MODULE_NAME: 'm',
    APP_NAME: 'n',
    INCLUDE_APP_CONTEXT: 's',
    INCLUDE_ROUTING: 'r',
    DECLARATIVE_STRUCTURE: 'd',
    USE_FIREBASE: 'f',
}

export const helpMessage = `
    Commands
	
	     ${ blueBoldText('$') } ${ greenText('init') } <input>
	          --appName              ${ pinkBoldText(`-${ FLAG.APP_NAME }`) } - set app module name
	          --declarativeStructure ${ pinkBoldText(`-${ FLAG.DECLARATIVE_STRUCTURE }`) } - generate project structure based on specified declaration, ignores ${ pinkBoldText(`-${ FLAG.INCLUDE_APP_CONTEXT }`) } and ${ pinkBoldText(`-${ FLAG.INCLUDE_ROUTING }`) } flags
	          --includeAppContext    ${ pinkBoldText(`-${ FLAG.INCLUDE_APP_CONTEXT }`) } - set app context and basic state management
	          --includeRouting       ${ pinkBoldText(`-${ FLAG.INCLUDE_ROUTING }`) } - add basic routing
	          --useFirebase          ${ pinkBoldText(`-${ FLAG.USE_FIREBASE }`) } - add basic firebase setup
	     ${ blueBoldText('$') } ${ greenText('add') } <input>
	          --moduleName           ${ pinkBoldText(`-${ FLAG.MODULE_NAME }`) } - set module name
	     ${ blueBoldText('$') } ${ greenText('help') }

`

export const unknownCommandMessage = redText('Error:') + ' unknown command. Try --help.'
