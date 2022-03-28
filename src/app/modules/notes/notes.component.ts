import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from '../../core/services/notes.service';
import { FirebaseNote } from '../../core/interfaces/firebase-note.model';
import { TimerService } from '../../core/services/timer.service';
import { Color, colors } from '../../core/interfaces/color';
import { FileUpload } from '../../core/interfaces/file-upload';
import { interval } from 'rxjs/internal/observable/interval';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: FirebaseNote = new FirebaseNote();
  isNotePosted = true;
  notes: Note[] = [];
  selectedValue: any;
  value!: number;
  date!: Date;

  colors: Color[] = colors;

  selectedFiles: FileUpload[] = [];
  currentFileUpload: FileUpload | undefined;
  percentage!: number;

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
    //this.expiredNoteCounter();
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
        //console.log('táto note je expired -> ' + note.data.title);
        note.data.title = 'expired note -> ' + note.data.title;

        note.data.state = false; //nefunguje
      }
    });
  }

  //používatel zaklikne po úspešnom ukončení ukolu
  onCompleteClick(selectedNote: Note) {
    this.CompletedTasks = this.CompletedTasks + 1;
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
    this.note.date = this.value;
    return this.value;
  }

  //zoradené od najnovšej po najstaršiu
  private formatNotes(notes: any): void {
    this.notes = Object.keys(notes).map((key) => ({
      uid: key,
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
    this.notesService.addNote(this.note).subscribe({
      next: (response: object) => {
        console.log(response);

        this.clearInput();
        this.getNotes();

        console.log(this.note.color);
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }

  onEditClick(note: Note) {
    console.log(note);
  }

  //používatel zaklikne po neúspešnom ukončení ukolu, alebo pri odstránení funkce kontroluje stav z akého dovodu sa odstranuje note
  //či je to zo stavom po expiraci alebo pred
  onDeleteClick(selectedNote: Note) {
    console.log(selectedNote.data);
    this.UnCompletedTasks = this.UnCompletedTasks + 1;

    this.taskPercentageCalculator();
    this.notesService.deleteNote(selectedNote.uid);

    this.notes.forEach((note, index) => {
      if (note.uid == selectedNote.uid) {
        this.notes.splice(index, 1);
      }
    });
  }

  private clearInput(): void {
    this.note = new FirebaseNote();
  }

  onSelectFile(event: Event): void {
    this.isNotePosted = false;

    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.note.files.push(new FileUpload(reader.result));
    };
  }

  onShareClick(note: Note) {
    window.open(
      'mailto:?subject=' +
        encodeURIComponent(note.data.title) +
        '&body=' +
        encodeURIComponent(note.data.body + ' add custom text here')
    );
  }

  async startTimer() {
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 0 + sec + 200;
    });
  }
}
