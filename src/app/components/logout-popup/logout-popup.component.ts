import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutPopupComponent>
  ){}
  logOut(){
    this.dialogRef.close('refresh');
  }
  Cancel(){
    this.dialogRef.close('cancel');
  }
}
