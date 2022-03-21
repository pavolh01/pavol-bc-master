import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from '../../core/services/notes.service';
import { FirebaseNote } from '../../core/interfaces/firebase-note.model';
import { TimerService } from '../../core/services/timer.service';
import { Color, colors } from '../../core/interfaces/color';
import { FileUpload } from '../../core/interfaces/file-upload';

//TODO
//vytvorit  pokud to ukládáš do db tak prostě udělej buď k té poznámce ještě parametr
// do kterého to úložíš a nebo to ukladej zvlášť a udělej tam noteId které bude shodné s idckem v
//databázi no

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

  colors: Color[] = colors;

  selectedFiles: FileUpload[] = [];
  currentFileUpload: FileUpload | undefined;
  percentage!: number;

  readonly allowedFormats: Array<string> = ['.jpeg', '.png', '.doc', '.mp3']; //doplň si formáty nevím co tam chces

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

  onDeleteClick(selectedNote: Note) {
    console.log(selectedNote.data);
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
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.note.files.push(new FileUpload(reader.result));
    };
  }

  // upload(): void {
  //   this.currentFileUpload = new FileUpload(this.selectedFile);
  //   // this.uploadService.pushFileToNote(this.currentFileUpload);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
  //     (percentage) => {
  //       if (!percentage) return;
  //       this.percentage = Math.round(percentage);
  //       if ((percentage = 100)) {
  //         setTimeout(() => {
  //           this.percentage = 0;
  //         }, 2000);
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
