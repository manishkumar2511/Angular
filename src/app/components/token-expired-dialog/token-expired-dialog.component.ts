import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-token-expired-dialog',
  templateUrl: './token-expired-dialog.component.html',
  styleUrls: ['./token-expired-dialog.component.css']
})
export class TokenExpiredDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TokenExpiredDialogComponent>
  ) {}

  Refresh(): void {
    this.dialogRef.close('refresh'); 
  }

  Cancel(): void {
    this.dialogRef.close('cancel'); 
  }
}
