export default class Schemas {
    
    static NotesSchema = {
        name: 'Notes',
        primaryKey: 'id',
        properties: {
            id: 'int',
            text: 'string',
        }
    } 

    static NotificationSchema = {
        name: 'Notification',
        primaryKey: 'id',
        properties: {
            id: 'int',
            date: {type: 'date', optional: true},
        }
    }

    static NoteSchema = {
        name: 'Note',
        primaryKey: 'id',
        properties: {
            id: 'int',
            title: {type: 'string', optional: true},
            description: {type: 'string', optional: true},
            annotations: 'Notes[]',
            checked: 'bool',
            favorite: 'bool',
            notifications: 'Notification[]',
            active: {type: 'bool', optional: true},
            routine: {type: 'bool', optional: true}
        }
    }

}