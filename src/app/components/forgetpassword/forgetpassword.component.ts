import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'] 
})
export class ForgetpasswordComponent implements OnInit {
  errorMessage: string = '';
  forgetPasswordForm: any;
  isEmailExistError:boolean=false;

  constructor(
    private httpService: HttpService,
     private formBuilder: FormBuilder,
     private snackBar: MatSnackBar,
    //  public dialogRef: MatDialogRef<ForgetpasswordComponent>,
     public _router:Router
    ) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  resetPassword() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.get('email')?.value;
      console.log(email); 
      this.httpService.ForgetPassword(email).subscribe(
        (response) => {
          if(response.success){
            this.openSnackBar(response.message);
            // this.dialogRef.close();
            this._router.navigateByUrl("/reset-password");
  
          }
        },
        (error) => {
          console.error(error);
          if(error.status===400){
            this.isEmailExistError=true;
            
          }
        }
      );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
