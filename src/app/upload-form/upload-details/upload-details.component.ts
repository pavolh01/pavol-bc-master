import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FileUpload } from '../file-upload';
@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  
})
export class UploadDetailsComponent implements OnInit {
  @Input()
  fileUpload!: FileUpload;
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
  }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
