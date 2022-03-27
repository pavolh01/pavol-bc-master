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

  constructor(private httpClient: HttpClient) {}
  //this.fb.state=false oprav funguje ale nie dobre

  stateUpdate(id: string, note: any) {}

  getNotes(): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);
  }

  addNote(note: FirebaseNote): Observable<object> {
    if (note.title == '') {
      note.title = 'Empty Note';
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
