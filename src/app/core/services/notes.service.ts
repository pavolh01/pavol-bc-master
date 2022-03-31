import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseNote } from '../interfaces/firebase-note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url: string =
    'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';
  private urlUid: string = `https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes/`;
  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);
  }

  addNote(note: FirebaseNote): Observable<object> {
    if (note.title == '') {
      note.title = 'Empty Note';
    }

    return this.httpClient.post(this.url, JSON.stringify(note));
  }

  updateNote(uid: string, note: FirebaseNote): Observable<object> {
    return this.httpClient.put(this.urlUid + `${uid}.json`, JSON.stringify(note));
  }

  deleteNote(uid: string) {
    return this.httpClient.delete(this.urlUid + `${uid}.json`).subscribe();
  }
}
