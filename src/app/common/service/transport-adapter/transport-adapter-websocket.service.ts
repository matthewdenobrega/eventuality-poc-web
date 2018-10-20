import { Injectable } from '@angular/core'
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { IStatement } from '../../xapi/statement.interface'
import { ChannelDecision, ChannelPerception } from '../channel/channel.service'

@Injectable()
export class TransportAdapterWebsocketService {
    private _connection: HubConnection

    // Constructor
    constructor(private _channelDecision: ChannelDecision, private _channelPerception: ChannelPerception) {
        this._connection = new HubConnectionBuilder().withUrl('https://localhost:44380/eventHub').build()

        this._connection.start().then(() => {
            console.log('Websocket connected')
        }, (err) => {
            console.error(err.toString())
        })

        this._channelPerception.observe().forEach((statement: IStatement) => {
            this.send(statement)
        })

        this._connection.on('Decision', (message: IStatement) => {
            console.log('Message received from hub')

            this._channelDecision.next(message)
        })
    }

    // Public
    public send(statement: IStatement) {
        console.log('Sending to Perception')
        console.dir(statement)
        this._connection.send('Perception', statement)
    }
}
