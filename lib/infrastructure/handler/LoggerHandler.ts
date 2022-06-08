import { format, Logger, transports, createLogger, addColors } from 'winston'

// Types
import { LoggerObject } from './types/LoggerType'

const customLevels = {
    levels: {
        audit: 0,
        crit: 1,
        error: 2,
        warning: 3,
        info: 4,
        debug: 5,
    },
    colors: {
        audit: 'white',
        debug: 'green',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        crit: 'red',
    },
}

const formatter = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.printf((info) => {
        const { timestamp, level, message, ...meta } = info

        return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
        }`
    })
)

class LoggerHandler {
    private logger: Logger

    constructor() {
        /*const prodTransport = new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        })*/
        const transport = new transports.Console({
            format: formatter,
        })
        this.logger = createLogger({
            // level: isDevEnvironment() ? 'trace' : 'error',
            levels: customLevels.levels,
            transports: [transport], //[isDevEnvironment() ? transport : prodTransport],
        })
        addColors(customLevels.colors)
    }

    audit(info: LoggerObject) {
        this.logger.log(info)
    }

    crit(info: LoggerObject) {
        this.logger.crit(info)
    }

    error(info: LoggerObject) {
        this.logger.error(info)
    }

    warning(info: LoggerObject) {
        this.logger.warn(info)
    }

    info(info: LoggerObject) {
        this.logger.info(info)
    }

    debug(info: LoggerObject) {
        this.logger.debug(info)
    }
}

export const logger = new LoggerHandler()
