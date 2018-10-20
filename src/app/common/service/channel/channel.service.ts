import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { StatementUtilities } from '../../xapi/statement-utilities.class'
import { IStatement } from '../../xapi/statement.interface'

@Injectable()
export class Channel {
    private _subject: Subject<IStatement>

    // Constructor
    constructor() {
        this._subject = new Subject()
    }

    // Public
    next(statement: IStatement) {
        this._subject.next(statement)
    }

    observe(): Observable<IStatement> {
        return this._subject.pipe(
            map((statement: IStatement) => StatementUtilities.clone(statement)))
    }

    observeVerb(verb: string): Observable<IStatement> {
        return this.observe().pipe(
            filter((statement: IStatement) => statement.verb.id === verb ))
    }
}

export class ChannelDecision extends Channel {}
export class ChannelPerception extends Channel {}
