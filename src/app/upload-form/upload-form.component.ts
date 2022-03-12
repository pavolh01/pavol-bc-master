import { Component, NgModule, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/upload-form/file-upload';
import { FileUploadService } from '../core/services/file-upload.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  
})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList | undefined;
  currentFileUpload: FileUpload | undefined;
  percentage: number | undefined;
  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage) => {
        this.percentage = Math.round(percentage);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
