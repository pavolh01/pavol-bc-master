import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate',
})
export class CustomDatePipe implements PipeTransform {
  constructor() {}
  transform(value: Date) {
    let date = new Date(value);
    return date;
  }
}
