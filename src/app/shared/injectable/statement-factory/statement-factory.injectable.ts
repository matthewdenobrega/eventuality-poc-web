import { Injectable } from '@angular/core'
import { IStatement } from '../../xapi/statement.interface'

const activityDefinitionDataExtension = 'http://eventuality.poc/xapi/object/extensions/data'

@Injectable()
export class StatementFactory {
    create(objectId: string, verbId: string, data?: any): IStatement {
        const statement: IStatement = {
            actor: {
                'mbox': 'mailto:matt.denobrega@gmail.com',
                'name': 'Matthew de Nobrega',
                'objectType': 'Agent'
            },
            object: {
                id: objectId
            },
            verb: {
                id: verbId
            }
        }

        if (data) {
            statement.object.definition = {
                extensions: {
                    [activityDefinitionDataExtension] : data
                }
            }
        }

        return statement
    }

    extractData(statement: IStatement) {
        try {
            return statement.object.definition.extensions[activityDefinitionDataExtension]
        } catch {
            return null
        }
    }
}
