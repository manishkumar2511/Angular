import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-success-dialog',
  templateUrl: './registration-success-dialog.component.html',
  styleUrl: './registration-success-dialog.component.css'
})
export class RegistrationSuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any

  ){}
}
