export class FileUpload {
  [x: string]: any;
  file: string | ArrayBuffer | null;
  file_name: string; 
  constructor(file: string | ArrayBuffer | null,file_name:string) {
    this.file = file;
    this.file_name=file_name;
  }
}
