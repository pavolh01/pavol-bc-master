import { Component, NgModule, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/upload-form/file-upload';
import { FileUploadService } from '../core/services/file-upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  selectedFile!: File;
  currentFileUpload: FileUpload | undefined;
  percentage!: number;

  constructor(private uploadService: FileUploadService) {}

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }
  upload(): void {
    this.currentFileUpload = new FileUpload(this.selectedFile);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage) => {
        if (!percentage) return;
        this.percentage = Math.round(percentage);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
