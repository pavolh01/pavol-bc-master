import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/upload-form/file-upload';
import { FirebaseNote } from '../interfaces/firebase-note.model';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url: string =
    'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';

  constructor(private httpClient: HttpClient, private fu: FileUploadService) {}

  getNotes(): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);
  }

  addNote(note: FirebaseNote): Observable<object> {
    //v add note volám metodu s uploadfile , v uploadfile musí byť nastavený paramater file id, ktorý sa nachádza v note insterafce
    // console.log('kkt'+this.fu.pushFileToStorage())
    return this.httpClient.post(this.url, note);
  }

  deleteNote(id: string) {
    return this.httpClient
      .delete(
        `https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`
      )
      .subscribe();
  }
}
