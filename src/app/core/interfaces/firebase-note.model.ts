export class FirebaseNote {
  title: string = '';
  body: string = '';
  date: Date = new Date();
  state: boolean = false;
  dateOfCreation: number = new Date().getTime();
  noteid?: number;
  color: string = '';
}
