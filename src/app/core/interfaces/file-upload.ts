export class FileUpload {
  [x: string]: any;
  fileBase64Url: string;
  fileName: string;
  contentType: string;
  constructor(fileBase64Url: string, fileName: string, contentType: string) {
    this.fileBase64Url = fileBase64Url;
    this.fileName = fileName;
    this.contentType = contentType;
  }
}
