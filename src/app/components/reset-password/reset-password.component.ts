import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _httpService:HttpService,
    private snackBar: MatSnackBar,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.ResetPasswordData = this.formBuilder.group({
      Otp: ['', [Validators.required]],
      Password: ['', [Validators.required, this.passwordValidator()]],
      ConfirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
    }, { validator: this.passwordValidator });
  }

  ResetPasswordData: any;
  invalidOTPError: boolean = false;


  ResetPassword() {
    if (this.ResetPasswordData.valid) {
      console.log(this.ResetPasswordData.value);
      this._httpService.changePassword(this.ResetPasswordData.value).subscribe((response)=>{
        if(response.success){
          console.log(response.message);
        this.openSnackBar(response.message);
        this.ResetPasswordData.reset();
        this._router.navigateByUrl("/login-page")
        }else{
          console.log(response.message);
          this.openSnackBar(response.message);
          this.ResetPasswordData.reset();
        }
      },
      error => {
        if (error.status === 400 ) {
          this.invalidOTPError=true;
        } else {
          console.error('Error occurred:', error);
          this.openSnackBar('Please try again later');
        }
      }
    )
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      return regex.test(control.value) ? null : { pattern: true };
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = this.ResetPasswordData ? this.ResetPasswordData.get('Password').value : null;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { confirmPasswordMismatch: true };
    };
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}


