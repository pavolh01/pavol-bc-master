import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseNote } from '../interfaces/firebase-note.model';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private url: string = 'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';

  constructor(private httpClient: HttpClient) {}

  getDate(date:number): Observable<FirebaseNote[]> {
    return this.httpClient.get<FirebaseNote[]>(this.url);

  }

  

  

  // private url: string =
  //   'https://notesoriginal-default-rtdb.europe-west1.firebasedatabase.app/notes.json';
  // constructor(private httpClient: HttpClient) {}

  // getDate(): Observable<FirebaseNote[]> {
  //   return this.httpClient.get<FirebaseNote[]>(this.url);

  // }

  // calculateDate() {
  //   const a = this.getDate();
  //   const b = this.getDate();
  //   console.log('cedw')
  // }
}
