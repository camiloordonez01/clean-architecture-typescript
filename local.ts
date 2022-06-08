import Server from './lib/infrastructure/webserver/server'

const main = (): void => {
    try {
        const server = new Server()
        server.listen()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()
