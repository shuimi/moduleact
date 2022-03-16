import fs from 'fs'
import { execSync } from 'child_process'
import readline from 'readline'

export const randString = ( length ) => (Math.random() + 1).toString(36).substring(2, length + 2)

export const askQuestion = ( query ) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

export * from './files.service.js'
export * from './npm.service.js'
export * from './command-line.service.js'
export * from './text-format.service.js'
export * from './descriptor-builder.service.js'