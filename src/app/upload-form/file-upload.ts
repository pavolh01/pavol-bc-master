import { Note } from "../core/interfaces/note.model";

export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    uid:Note | undefined
    constructor(file: File) {
      this.file = file;
    }
  }
  