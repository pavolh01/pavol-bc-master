import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './modules/notes/notes.component';

import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
//import { CustomDatePipe } from './core/pipes/date-pipe';
import { FirebaseNote } from './core/interfaces/firebase-note.model';




@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    //CustomDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    //CustomDatePipe
  ],
  providers: [ 
     AngularFireDatabase,
     FirebaseNote
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
