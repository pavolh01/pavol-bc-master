import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { FileUpload } from '../interfaces/file-upload';
import { FirebaseNote } from '../interfaces/firebase-note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url: string =
    'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';

  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {}

  getNotes(): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);
  }

  addNote(note: FirebaseNote): Observable<object> {
    console.log('k' + note.title);
    if (note.title == '') {
      note.title = 'Empty Note';
      console.log('k2' + note.title);
    }

    return this.httpClient.post(this.url, JSON.stringify(note));
  }

  deleteNote(id: string) {
    return this.httpClient
      .delete(
        `https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`
      )
      .subscribe();
  }
}
