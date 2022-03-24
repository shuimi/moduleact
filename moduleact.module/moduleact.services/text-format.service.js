import chalk from 'chalk'


const createTextFormat = () => {

    const KEBAB_CASE_REGEX = /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/

    const toCamelCase = ( text ) => text.replace(/-\w/g, clearAndUpper)

    const toPascalCase = ( text ) => text.replace(/(^\w|-\w)/g, clearAndUpper)

    const clearAndUpper = ( text ) => text.replace(/-/, "").toUpperCase()

    const isKebabCase = ( text ) => text.match(KEBAB_CASE_REGEX)

    const toKebabCase = ( text ) =>
        text &&
        text
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-')

    const blueBoldText = ( symbol ) => chalk.blue.underline.bold(symbol)

    const greenText = ( name ) => chalk.green(name)

    const pinkBoldText = ( name ) => chalk.hex('#DEADED').bold(name)

    const redText = ( text ) => chalk.red(text)


    return {
        toCamelCase,
        toPascalCase,
        toKebabCase,
        isKebabCase,
        blueBoldText,
        greenText,
        pinkBoldText,
        redText
    }

}

export const TextFormatService = createTextFormat()

