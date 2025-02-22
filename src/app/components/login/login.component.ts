import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TokenExpiredDialogComponent } from '../token-expired-dialog/token-expired-dialog.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = ''; 
  matcher: ErrorStateMatcher = new LoginFormValidation();

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _dialog: MatDialog,
  // private authService:SocialAuthService
  ) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  login() {
    debugger
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const loginData = {
        UserName: this.emailFormControl.value, 
        Password: this.passwordFormControl.value
      };

      this._httpService.UserLogin(loginData).subscribe((response: any) => {
        debugger
        localStorage.setItem("Token", response.token);
        localStorage.setItem("RefreshToken", response.refreshToken);
        localStorage.setItem("FirstName",response.userName);
        localStorage.setItem("LastName",response.lastName)
        this.emailFormControl.reset();
        this.passwordFormControl.reset();
        this.errorMessage = '';
        this._router.navigateByUrl("/student-dashboard");
      }, (error) => {
        if (error.status === 401 && error.error === 'Your token has expired.') {
          this._httpService.openTokenExpiredDialog();
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }


  OpenForgetPasswordForm(){
    //this._dialog.open(ForgetpasswordComponent);
    this._router.navigate(['/forget-Password']);
  }

  signInWithGoogle(): void {
   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}

export class LoginFormValidation implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}








// import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
// import { HttpService } from '../../services/http.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   errorMessage: string = ''; 
//   constructor(private _httpService: HttpService ,private _router:Router) {}

//   emailFormControl = new FormControl('', [Validators.required, Validators.email]);
//   passwordFormControl = new FormControl('', [Validators.required]);
//   matcher: ErrorStateMatcher = new LoginFormValidation();

//   login() {
//     if (this.emailFormControl.valid && this.passwordFormControl.valid) {
//       const loginData = {
//         UserName: this.emailFormControl.value, 
//         Password: this.passwordFormControl.value
//       };
//       console.log('Login Data:', loginData);
//       this._httpService.UserLogin(loginData).subscribe((response:any) => {
//         // console.log("Logged in successfully");
//         // console.log(" TOKEN :"+ response.token);
//         localStorage.setItem("Token",response.token);
//         this.emailFormControl.reset();
//         this.passwordFormControl.reset();
//         this.errorMessage = '';
//         this._router.navigateByUrl("/student-dashboard")
//       }, error => {
//         console.error("Login failed:", error);
//         this.errorMessage = 'Incorrect UserName or Password'; 
//       });
//     } else{
//       this.errorMessage = 'Please fill in all fields correctly';
//     }
//   }
// }

// export class LoginFormValidation implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null): boolean {
//     return !!(control && control.invalid && (control.dirty || control.touched));
//   }
// }
