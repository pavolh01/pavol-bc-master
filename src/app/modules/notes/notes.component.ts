import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from 'src/app/core/services/notes.service';
import { FirebaseNote } from 'src/app/core/interfaces/firebase-note.model';
import { TimerService } from 'src/app/core/services/timer.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  note: FirebaseNote = new FirebaseNote();

  notes: Note[] = [];
  selectedValue: any;
  value!: number;
  date!: Date;

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
    const a = this.timerservice.getDates();

    console.log(a);
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
    // this.notesService.deleteNote().subscribe();

    this.notes.forEach((note, index) => {
      if (note.uid == selectedNote.uid) {
        this.notes.splice(index, 1);
      }
    });
  }

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
