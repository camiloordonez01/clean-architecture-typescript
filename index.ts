import { APIGatewayEvent, Context } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
import Server from './lib/infrastructure/webserver/server'

const server = awsServerlessExpress.createServer(new Server().app)

export const handler = (event: APIGatewayEvent, context: Context): void => {
    awsServerlessExpress.proxy(server, event, context)
}
