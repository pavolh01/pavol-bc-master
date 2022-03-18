import { Component } from '@angular/core';
import { FileUpload } from '../upload-form/file-upload';
import { FileUploadService } from '../core/services/file-upload.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  selectedFile!: File;
  currentFileUpload: FileUpload | undefined;
  percentage!: number;

  readonly allowedFormats: Array<string> = ['.jpeg', '.png', '.doc', '.mp3']; //doplň si formáty nevím co tam chces

  constructor(private uploadService: FileUploadService) {}

  onSelectFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }
  upload(): void {
    this.currentFileUpload = new FileUpload(this.selectedFile);
    this.uploadService.pushFileToNote(this.currentFileUpload);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage) => {
        if (!percentage) return;
        this.percentage = Math.round(percentage);
        if ((percentage = 100)) {
          setTimeout(() => {
            this.percentage = 0;
          }, 2000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
