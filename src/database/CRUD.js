import getRealm from './realm';

export async function insertNote(newNote){
    try{
        const realm = await getRealm();
        //console.log('NewNote', newNote);
        realm.write(() => {
            realm.create('Note', newNote, 'modified');
        })
        
    }catch(error){
        console.log(error)
    }
}

export async function deleteNote(item){
    try{
        const realm = await getRealm();
        
        let deletingNote = realm.objectForPrimaryKey('Note', item.id);
       
        realm.write(() => {
            realm.delete(deletingNote);
        });
    }catch(error){
        console.log(error);
    }
};

export async function deleteAll(){
    try{
        const realm = await getRealm();

        const note = realm.objects('Note');

        realm.write(() => {
            if(note.length > 0){
                realm.delete(note);
            }
        })
    }catch(e){
        Alert.alert(`${e}`);
    }
};

export async function updateNote(noteOld, noteNew){
    try{
        const realm = await getRealm();
        let updatingNote = realm.objectForPrimaryKey('Note', noteOld.id);

        realm.write(() => {
            updatingNote.title = noteNew.title;
            updatingNote.description = noteNew.description;
            updatingNote.annotations = noteNew.annotations;
        })
    }catch(error){
        console.log(error);
    }
}

export async function updateNotification(noteOld, newNote){
    try{
        const realm = await getRealm();
        let updateNotif = realm.objectForPrimaryKey('Note', noteOld.id);

        for(let i = 0; i < newNote.notifications.length; i++){
            console.log("into BD: ", newNote.notifications[i].date);
        }

        realm.write(() => {
            updateNotif.routine = newNote.routine;
            updateNotif.notifications = newNote.notifications;
            updateNotif.active = newNote.active;
        })
    }catch(err){
        console.log(err);
    }
}