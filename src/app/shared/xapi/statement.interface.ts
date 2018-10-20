export interface IActivity {
    id: string
    definition?: IActivityDefinition
}

export interface IActivityDefinition {
    extensions?: any
}

export interface IActor {
    mbox: string
    name: string
    objectType: string
}

export interface IStatement {
    actor: IActor
    object: IActivity
    verb: IVerb
}

export interface IVerb {
    id: string
}
