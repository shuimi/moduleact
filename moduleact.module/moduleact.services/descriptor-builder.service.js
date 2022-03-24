import { TextFormatService } from './text-format.service.js'


const descriptorTemplate = (path, isExact, isIndex, componentName) => `export default {
    routeProps: {
        path: '${path}',
        exact: ${isExact},
        index: ${isIndex},
        element: <${componentName}/>,
    },
    name: 'Camera',
}`

export const createDescriptorGenerator = (rootPostfix) => {
    const createModuleDescriptor = (moduleName, path, isExact=true, isIndex=false) => {

        let componentName = TextFormatService.toPascalCase(moduleName) + rootPostfix

        let moduleDescriptor = descriptorTemplate(path, isExact, isIndex, componentName)

        return moduleDescriptor
    }
    return createModuleDescriptor
}
