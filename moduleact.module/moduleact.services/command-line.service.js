export const log = console.log

export const from = ( args ) => {
    let matchFound = false

    const expect = ( command ) => ({
        do: ( action ) => {
            if (args[0] === command) {
                action()
                matchFound = true
            }
            return {
                expect: expect,
                so: ( action ) => {
                    if (!matchFound) {
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
