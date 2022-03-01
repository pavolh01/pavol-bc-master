import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageType } from '../enums/snackbar-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, messageType: SnackBarMessageType): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      data: message,
      panelClass: messageType,
    });
  }
}
