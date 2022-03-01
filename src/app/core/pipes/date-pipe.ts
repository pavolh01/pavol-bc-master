import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseNote } from '../interfaces/firebase-note.model';
@Pipe({
  name: 'customdate',
})
export class CustomDatePipe implements PipeTransform {
  constructor(private note: FirebaseNote) {}
  transform(value: Date) {
    let date = new Date(value).toLocaleDateString()
    return date
  }

  // onDateChanged() {
  //   if (this.note.date) {
  //     var a = this.note.date.getTime();
  //     console.log(a);
  //     return a;
  //   } else return console.error();
  // }
}
