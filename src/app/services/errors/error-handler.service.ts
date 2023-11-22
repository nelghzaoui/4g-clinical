import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  handleError(error: any): void {
    this.matSnackBar.open(error.message, 'Close', {
      duration: 5000,
    });
  }
}
