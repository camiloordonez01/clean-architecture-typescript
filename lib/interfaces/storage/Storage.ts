import DataBase from '../../infrastructure/database'

class Storage {
    protected database: DataBase
    constructor() {
        this.database = DataBase.createConnection()
    }
}

export default Storage
