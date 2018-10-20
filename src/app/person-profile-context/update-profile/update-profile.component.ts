import { Component, Version } from '@angular/core'
import { DecisionChannel, PerceptionChannel } from '../../shared/injectable/channel/channel.injectable'
import { StatementFactory } from '../../shared/injectable/statement-factory/statement-factory.injectable'
import { IStatement } from '../../shared/xapi/statement.interface'
import { Verbs } from '../../shared/xapi/verbs.enum'
import { Person } from './update-profile.class'

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent {
    person: Person
    personId: string

    // Constructor
    constructor(private _channelDecision: DecisionChannel,
        private _channelPerception: PerceptionChannel,
        private _statementFactory: StatementFactory
    ) {
        this.personId = 'http://eventuality.poc/person/1'

        const personChangedVerbs = [Verbs.PersonRetrieved, Verbs.PersonUpdated]
        this._channelDecision.observeVerbs(personChangedVerbs).forEach((statement: IStatement) => {
            this.person = this._statementFactory.extractData(statement)
        })

        this.request()
    }

    // Public
    send() {
        const statement = this._statementFactory.create(this.personId, Verbs.PersonUpdateRequested, this.person)
        this._channelPerception.next(statement)
    }

    // Private
    private request() {
        const statement = this._statementFactory.create(this.personId, Verbs.PersonRequested)
        this._channelPerception.next(statement)
    }
}
