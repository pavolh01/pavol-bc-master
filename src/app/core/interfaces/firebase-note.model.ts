import { FileUpload } from "./file-upload";

export class FirebaseNote {
  title: string = '';
  body: string = '';
  date!: number;
  state: boolean = true;
  dateOfCreation: number = new Date().getTime();

  color: string = '';
  colorid: string = '';
 file_id: string = '';
  files: FileUpload[] = [];
}
