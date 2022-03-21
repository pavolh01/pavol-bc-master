export class FileUpload {
  file: string | ArrayBuffer | null;
  constructor(file: string | ArrayBuffer | null) {
    this.file = file;
  }
}
