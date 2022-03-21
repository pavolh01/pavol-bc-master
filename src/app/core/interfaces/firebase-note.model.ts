import { FileUpload } from "./file-upload";

export class FirebaseNote {
  title: string = '';
  body: string = '';
  date!: number;
  state: boolean = false;
  dateOfCreation: number = new Date().getTime();
  noteid!: number;
  color: string = '';
  files: FileUpload[] = [];
}
