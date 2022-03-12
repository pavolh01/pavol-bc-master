import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseNote } from '../interfaces/firebase-note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private url: string =
    'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';

  constructor(private httpClient: HttpClient) {}

  getDates(): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);
  }
}
