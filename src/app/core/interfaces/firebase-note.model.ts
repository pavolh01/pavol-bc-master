export class FirebaseNote {
  title: string = '';
  body: string = '';
  date!: number;
  state: boolean = false;
  dateOfCreation: number = new Date().getTime();
  noteid!: number;
  color: string = '';
 //nové
  filename:string='';
}
