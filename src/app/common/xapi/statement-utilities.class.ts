import { IStatement } from './statement.interface'

const activityDefinitionDataExtension = 'http://eventuality.poc/xapi/object/extensions/data'

export class StatementUtilities {
    static clone(statement: IStatement) {
        return JSON.parse(JSON.stringify(statement))
    }

    static create(objectId: string, verbId: string, data?: any): IStatement {
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

    static extractData(statement: IStatement) {
        try {
            return statement.object.definition.extensions[activityDefinitionDataExtension]
        } catch {
            return null
        }
    }
}
