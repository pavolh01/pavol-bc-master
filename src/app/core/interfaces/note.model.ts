import { FirebaseNote } from "./firebase-note.model";

export class Note {
    uid: string = '';
    isExpired: boolean = false;
    data: FirebaseNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
        state: true,
        dateOfCreation: new Date().getTime(),
        //noteid: number,
        color: '',
        colorid: '',
        file_id: '',
        files: [],
    }
}