import { execSync } from 'child_process'

export const createNpmService = (appDescriptor) => {

    const installReact = () => {
        execSync(`npx create-react-app ${appDescriptor.appName} --template typescript`, {
            stdio: 'inherit'
        })
    }

    const installReactRouterV6 = () => {
        execSync(`npm install react-router-dom@6`, {
            stdio: 'inherit'
        })
    }

    const installFirebase = () => {
        execSync(`npm install firebase`, {
            stdio: 'inherit'
        })
    }

    return {
        installReact,
        installReactRouterV6,
        installFirebase
    }
}