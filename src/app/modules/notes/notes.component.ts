import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from '../../core/services/notes.service';
import { FirebaseNote } from '../../core/interfaces/firebase-note.model';
import { TimerService } from '../../core/services/timer.service';
import { Color, colors } from '../../core/interfaces/color';
import { FileUpload } from '../../core/interfaces/file-upload';
import { interval } from 'rxjs/internal/observable/interval';
import { ThisReceiver } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: Note = new Note();
  isNotePosted = true;
  notes: Note[] = [];
  selectedValue: any;
  value!: number;
  date!: Date;


  isNoteExpired: boolean = false;

  colors: Color[] = colors;

  selectedFiles: FileUpload[] = [];
  currentFileUpload: FileUpload | undefined;
  percentage!: number;
  fb: FirebaseNote = new FirebaseNote();

  readonly allowedFormats: Array<string> = ['.jpeg', '.png', '.doc', '.mp3']; //doplň si formáty nevím co tam chces
  progressbarValue = 0;
  CompletedTasks = 0;
  UnCompletedTasks = 0;
  TaskCount = 0;
  constructor(
    private notesService: NotesService,
    private timerservice: TimerService
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.getDate();
   
  }
  playCompleteAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/sound01.mp3";
    audio.load();
    audio.play();
    
  }
  playDeleteAudio()
  {
    let audio = new Audio();
    audio.src = "../../../assets/audio/sound02.mp3";
    audio.load();
    audio.play();
    
  }

  private getNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (notes: FirebaseNote[]) => {
        this.formatNotes(notes);

        this.expiredNoteCounter();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private getDate() {
    const a = this.timerservice.getDates();

    console.log(a);
  }
  // TODO dokonč aby fungovala zmena stavu, po tom čo bude zmena stavu fungovať môžeš začať s tým aby sa tomu prisposobil counter
  //ktorý bude načítavať do premenných complete a uncomplete tastks aký stav má uloha

  public expiredNoteCounter(): void {
    const myDate = new Date();

    this.notes.forEach((note) => {
      var date2: number = note.data.date;
      var date3 = Number(myDate.getTime());
      if (date3 > date2) {
        note.isExpired = true;
        note.data.state = false;

        this.notesService.updateNote(note.uid, note.data).subscribe();
      }
    });
  }

  //používatel zaklikne po úspešnom ukončení ukolu
  onCompleteClick(selectedNote: Note) {
    if (selectedNote.data.state == true) {
      this.CompletedTasks = this.CompletedTasks + 1;
    } else {
      this.UnCompletedTasks = this.UnCompletedTasks + 1;
    }

    this.taskPercentageCalculator();
    this.notesService.deleteNote(selectedNote.uid);

    this.notes.forEach((note, index) => {
      if (note.uid == selectedNote.uid) {
        this.notes.splice(index, 1);
      }
    });
  }

  taskPercentageCalculator() {
    this.TaskCount =
      this.CompletedTasks / (this.UnCompletedTasks + this.CompletedTasks);
    console.log(this.TaskCount);
    return this.TaskCount;
  }

  public assignValue(event: any): number {
    this.value = event.getTime();
    console.log(this.value);
    this.note.data.date = this.value;
    return this.value;
  }

  //zoradené od najnovšej po najstaršiu
  private formatNotes(notes: any): void {
    this.notes = Object.keys(notes).map((key) => ({
      uid: key,
      isExpired: false,
      data: notes[key],
    }));

    this.notes.sort(
      (a, b) =>
        new Date(a.data.date).getDate() - new Date(b.data.date).getDate()
    );

    this.notes.reverse();
    console.log(this.notes);
  }

  onAddNoteClick() {
    this.notesService.addNote(this.note.data).subscribe({
      next: (response: object) => {
        console.log(response);

        this.onClearNoteClick();
        this.getNotes();

        console.log(this.note.data.color);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  onEditNoteClick() {
    this.notesService.updateNote(this.note.uid, this.note.data).subscribe({
      next: (response: object) => {
        console.log(response);

        this.onClearNoteClick();
        this.getNotes();

        console.log(this.note.data.color);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  onSelectNoteClick(note: Note) {
    this.note = note;
    this.date = new Date(note.data.date);
  }


onShareClick(note:Note)
{
 return `http://twitter.com/share?text= ${note.data.title}`;
}


  onClearNoteClick() {
    this.note = new Note();
    this.date = new Date();
    this.isNoteExpired = false;
  }

  //používatel zaklikne po neúspešnom ukončení ukolu, alebo pri odstránení funkce kontroluje stav z akého dovodu sa odstranuje note
  //či je to zo stavom po expiraci alebo pred
  onDeleteClick(selectedNote: Note) {
    console.log(selectedNote.data);

    if (selectedNote.data.state == false) {
      this.UnCompletedTasks = this.UnCompletedTasks + 1;
    }else{console.log('úloha včas odstránená')}

    this.taskPercentageCalculator();
    this.notesService.deleteNote(selectedNote.uid);

    this.notes.forEach((note, index) => {
      if (note.uid == selectedNote.uid) {
        this.notes.splice(index, 1);
      }
    });
  }

  onSelectFile(event: Event): void {
    this.isNotePosted = false;

    if (!this.note.data.files) {
      this.note.data.files = [];
    }

    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file.name)
    reader.onload = () => {
      this.note.data.files.push(new FileUpload(reader.result));
      
    };
  }

  // onShareClick(note: Note) {
  //   window.open(
  //     'mailto:?subject=' +
  //       encodeURIComponent(note.data.title) +
  //       '&body=' +
  //       encodeURIComponent(note.data.body + ' add custom text here')
  //   );
  // }

  async startTimer() {
    const timer$ = interval(1000);

     timer$.subscribe((sec) => {
      this.progressbarValue = 0 + sec + 200;
    });
    
  }
}
