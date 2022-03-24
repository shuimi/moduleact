import fs from 'fs'
import path from 'path'


export const createFilesService = (appDescriptor, templatesDir) => {

    const clearSrcDirectory = () => {

        const baseDirectory = './src'

        fs.readdir(baseDirectory, (error, files) => {
            if (error) throw error;

            for (const file of files) {

                fs.unlink(path.join(baseDirectory, file), error => {
                    if (error) throw error;
                })

            }
        })

    }

    const inject = (file, replacementKey, replacementValue) => {
        //TODO: injection procedure
    }

    const injectAppName = (file) => {
        const appName = appDescriptor.appName

        //TODO: inject

        const preparedFile = file
        return preparedFile
    }

    const moveBasicSetupToSrc = () => {
        // fs.writeFile('hello.txt', 'text', ( error ) => {
        //     if (error) throw error;
        //     console.log("Асинхронная запись файла завершена. Содержимое файла:");
        //     let data = fs.readFileSync("hello.txt", "utf8");
        //     console.log(data);
        // })
    }

    const injectFirebaseSetup = () => {

    }

    const eraseFirebaseSetup = () => {

    }

    const injectRoutingSetup = () => {

    }

    const eraseRoutingSetup = () => {

    }

    const injectContextSetup = () => {

    }

    const eraseContextSetup = () => {

    }

    return {
        clearSrcDirectory,
        moveBasicSetupToSrc,
        injectFirebaseSetup,
        injectRoutingSetup,
        injectContextSetup,
        eraseFirebaseSetup,
        eraseRoutingSetup,
        eraseContextSetup
    }

}