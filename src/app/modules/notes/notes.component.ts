import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from 'src/app/core/services/notes.service';
import { FirebaseNote } from 'src/app/core/interfaces/firebase-note.model';
import { TimerService } from 'src/app/core/services/timer.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: FirebaseNote = new FirebaseNote();

  notes: Note[] = [];
  selectedValue: any;

  constructor(
    private notesService: NotesService,
    private timerservice: TimerService
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.getDate();
  }

  private getNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (notes: FirebaseNote[]) => {
        this.formatNotes(notes);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  //skúška

  private getDate() {
    const a = this.timerservice.getDate(this.note.dateOfCreation).subscribe();

    console.log(this.timerservice.getDate(this.note.dateOfCreation));
  }

  //format notes nefunguje správne lebo som zmenil na number a miliseconds
  private formatNotes(notes: any): void {
    this.notes = Object.keys(notes).map((key) => ({
      uid: key,
      data: notes[key],
    }));

    this.notes.sort(
      (b, a) =>
        new Date(a.data.dateOfCreation).getTime() -
        new Date(b.data.dateOfCreation).getTime()
    );
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

  onDeleteClick(selectedNote: Note) {
    console.log(selectedNote);
    this.notes.forEach((note, index) => {
      if (note.uid == selectedNote.uid) {
        this.notes.splice(index, 1);
      }
    });
  }

  //počíta čas poznámky

  private clearInput(): void {
    this.note = new FirebaseNote();
  }

  public Icolors = [
    { label: 'FFFFFF', value: 'FFFFFF' },
    { label: '000000', value: '000000' },
    { label: '603813', value: '603813' },
    { label: 'FF0000', value: 'FF0000' },
    { label: '2E3192', value: '2E3192' },

    { label: '006837', value: 'FFD400' },
    { label: 'F15A24', value: 'F15A24' },
    { label: 'CCCCCC', value: 'CCCCCC' },
    { label: 'DBC0B5', value: 'DBC0B5' },
    { label: 'FAB49B', value: 'FAB49B' },

    { label: '87B2C7', value: '87B2C7' },
    { label: 'ACD58A', value: 'ACD58A' },
    { label: 'FFF9AE', value: 'FFF9AE' },
  ];
}
