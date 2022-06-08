import { DataSource, EntityTarget, Repository } from 'typeorm'
import { logger } from '../handler'

import { ProductEntity } from '../../domain/entities'

const { HOST_DB, PORT_DB, USER_DB, PASSWORD_DB, SCHEMA_DB } = process.env

class DataBase {
    static instance: DataBase | null = null
    private appDataSource: DataSource

    private constructor() {
        this.appDataSource = new DataSource({
            type: 'mysql',
            host: HOST_DB,
            port: Number(PORT_DB),
            username: USER_DB,
            password: PASSWORD_DB,
            database: SCHEMA_DB,
            synchronize: false,
            logging: false,
            entities: [ProductEntity],
            subscribers: [],
            migrations: [],
        })
    }

    private startConnection(): void | Promise<Error> {
        try {
            this.appDataSource.initialize()
            console.log('Data Source has been initialized!')
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                logger.crit({
                    level: 'crit',
                    file: 'database/index.ts',
                    message: `${error.message}`,
                    stack: error.stack,
                })
            }
            return Promise.reject(error)
        }
    }

    static createConnection(): DataBase {
        if (DataBase.instance === null) {
            DataBase.instance = new DataBase()
            DataBase.instance.startConnection()
        }
        return DataBase.instance
    }

    getRepository<Entity>(entity: EntityTarget<Entity>): Repository<Entity> {
        return this.appDataSource.getRepository(entity)
    }
}

export default DataBase
