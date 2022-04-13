import { Component, OnInit } from '@angular/core';
import { Note } from '../../core/interfaces/note.model';
import { NotesService } from '../../core/services/notes.service';
import { FirebaseNote } from '../../core/interfaces/firebase-note.model';
import { TimerService } from '../../core/services/timer.service';
import { Color, colors } from '../../core/interfaces/color';
import { FileUpload } from '../../core/interfaces/file-upload';
import { interval } from 'rxjs/internal/observable/interval';
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
  Fname!: FileUpload;
  contentType!: string;

  isNoteExpired: boolean = false;

  colors: Color[] = colors;

  selectedFiles: FileUpload[] = [];
  currentFileUpload: FileUpload | undefined;
  percentage!: number;
  fb: FirebaseNote = new FirebaseNote();

  readonly allowedFormats: Array<string> = ['.jpeg', '.png', '.doc', '.mp3'];
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
  playCompleteAudio() {
    let audio = new Audio();
    audio.src = '../../../assets/audio/sound01.mp3';
    audio.load();
    audio.play();
  }
  playDeleteAudio() {
    let audio = new Audio();
    audio.src = '../../../assets/audio/sound02.mp3';
    audio.load();
    audio.play();
  }
  //1
  // onShowImage()
  // {
  //   this.notes.forEach((note) => {
  //     console.log(note.data.files)
  //     const reader=new FileReader();
  //     const a=note.data.files.toString()
  //     const byteCharacters = atob(a);
  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //         console.log(byteNumbers[i])
  //     }

  //   })

  // }

  // 2
  // public dataURLtoFile(dataurl: any, filename: string): File {
  //   var arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // }

  private getNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (notes: FirebaseNote[]) => {
        this.formatNotes(notes);
        this.note.data.files;

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

  onShareClick(note: Note) {
    window.open(
      `http://twitter.com/share?text= title: ${note.data.title}  content: ${note.data.body}`,
      '_blank'
    );
  }

  onClearNoteClick() {
    this.note = new Note();
    this.date = new Date();
    this.isNoteExpired = false;
  }

  onDeleteClick(selectedNote: Note) {
    console.log(selectedNote.data);

    if (selectedNote.data.state == false) {
      this.UnCompletedTasks = this.UnCompletedTasks + 1;
    } else {
      console.log('úloha včas odstránená');
    }

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

    reader.onload = () => {
      this.note.data.files.push(new FileUpload(reader.result, file.name));
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

  convertBase64ToBlobData(base64Data: string) {
    const sliceSize = 512;
    // const base64String = base64Data.replace('data:image/png;base64,', '');
    //console.log(base64String);
    console.log(base64Data);

    var str = base64Data;
    var arr = str.split(',');
    arr.shift();
    str = arr.join(',');
    console.log(str);

    const fileBase64Url = str; //fileBase64Url

    var str = base64Data;
    var tmpStr = str.match(':(.*);');
    var newStr = tmpStr![1];
    const contentType = newStr;
    this.contentType = contentType; //contenttype

    const byteCharacters = atob(fileBase64Url);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  downloadImage(fileName: FileUpload, fileBase64Url: FileUpload) {
    const blobData = this.convertBase64ToBlobData(
      fileBase64Url.file!.toString()
    );

    const blob = new Blob([blobData], { type: this.contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    this.Fname = fileName;
    link.download = "nefunguje filename :((";//this.Fname.toString()
   
    link.click();
  }

  onDownloadFileClick(file: FileUpload) {
    this.downloadImage(this.Fname, file);
  }
}
