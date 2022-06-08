type level = 'audit' | 'crit' | 'error' | 'warning' | 'info' | 'debug'

export interface LoggerObject {
    level: level
    file: string
    message: string
    stack?: string | undefined
}
