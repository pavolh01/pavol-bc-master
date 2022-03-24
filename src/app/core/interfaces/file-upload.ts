export class FileUpload {
  [x: string]: any;
  file: string | ArrayBuffer | null;
  constructor(file: string | ArrayBuffer | null) {
    this.file = file;
  }
}
