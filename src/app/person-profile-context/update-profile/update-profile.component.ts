import { Component } from '@angular/core'
import { ChannelDecision, ChannelPerception } from '../../common/service/channel/channel.service'
import { StatementUtilities } from '../../common/xapi/statement-utilities.class'
import { IStatement } from '../../common/xapi/statement.interface'

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent {
    name: string
    nameSaved: string

    // Constructor
    constructor(private _channelDecision: ChannelDecision, private _channelPerception: ChannelPerception) {
        this._channelDecision.observe().forEach((statement: IStatement) => {
            console.dir(statement)
            this.nameSaved = StatementUtilities.extractData(statement).Name
        })
    }

    // Public
    send() {
        const person: any = {
            id: 'http://eventuality.poc/person/1',
            name: this.name
        }

        const statement = StatementUtilities.create('http://eventuality.poc/person/1',
            'http://eventuality.poc/xapi/verb/person-update-requested', person)

        this._channelPerception.next(statement)
    }
}
