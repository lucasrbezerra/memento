import Realm from 'realm';
import Schema from './schemas'

export default function getRealm(){
    return Realm.open( {
        schema: [Schema.NotesSchema, Schema.NoteSchema, Schema.NotificationSchema],
        schemaVersion: 114,
    });
}