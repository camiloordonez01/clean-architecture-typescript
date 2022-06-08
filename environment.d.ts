/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'dev' | 'qa' | 'prod'
            HOST_DB: string
            PORT_DB?: string
            USER_DB: string
            PASSWORD_DB: string
            SCHEMA_DB: string | '3306'
            TIMEZONE: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
