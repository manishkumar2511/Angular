import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import { LoderService } from '../../services/loder.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterComponent>,
    public successDialog: MatDialogRef<RegistrationSuccessDialogComponent>,
    private openDialog: MatDialog,
    public _loderService:LoderService
  ) {}

  RegistrationData: any;
  emailExistsError: boolean = false;

  ngOnInit() {
    this.RegistrationData = this.formBuilder.group({
      firstName: ['', [Validators.required, this.nameValidator()]],
      lastName: ['', [Validators.required, this.nameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordValidator });
  }

  Register() {
    this._loderService.isloading.next(true);
    if (this.RegistrationData.valid) {
      const formData = {
        FName: this.RegistrationData.value.firstName,
        LName: this.RegistrationData.value.lastName,
        Email: this.RegistrationData.value.email,
        Mobile: this.RegistrationData.value.mobileNumber,
        Password: this.RegistrationData.value.password
      };
      this.httpService.RegisterUser(formData).subscribe(
        () => {
          console.log("Registered successfully");
          this.openSnackBar('Registration successfully done!');
          this.dialogRef.close();
          this.openRegistrationSuccessDialog();
          this.RegistrationData.reset();
          
        },
        error => {
          if (error.status === 409) {
            this.emailExistsError = true;
            this.openSnackBar("Email already exists.");
          } else {
            console.error('Error occurred:', error);
            this.openSnackBar('Please try again later');
          }
        }
      ).add(
        ()=>{
          this._loderService.isloading.next(false)
        }
      );
    }else{
      this._loderService.isloading.next(false);
    }
  }

  openRegistrationSuccessDialog(): void {
    const dialogRef = this.openDialog.open(RegistrationSuccessDialogComponent, {
      data: { message: 'Registration success, please check your email. Thank you!' },
      width: '400px', 
      height: '300px',
      disableClose: true, 
      maxHeight: '90vh'
    });

    
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(control.value) ? null : { invalidName: true };
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = this.RegistrationData ? this.RegistrationData.get('password').value : null;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { confirmPasswordMismatch: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      return regex.test(control.value) ? null : { pattern: true };
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






//it works fine except password matching errror 
// import { Component } from '@angular/core';
// import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { HttpService } from '../../services/http.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   constructor(
//     private httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private snackBar: MatSnackBar,
//     public dialogRef: MatDialogRef<RegisterComponent>,
//     public successDialog:MatDialogRef<RegistrationSuccessDialogComponent>,
//     private openDialog:MatDialog
//   ) {}

//   RegistrationData: any;
//   emailExistsError: boolean = false;

//   ngOnInit() {
//     this.RegistrationData = this.formBuilder.group({
//       firstName: ['', [Validators.required, this.nameValidator()]],
//       lastName: ['', [Validators.required, this.nameValidator()]],
//       email: ['', [Validators.required, Validators.email]],
//       mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]]
//     }, { validator: this.passwordValidator });
//   }

//   Register() {
//     if (this.RegistrationData.valid) {
//       const formData = {
//         FName: this.RegistrationData.value.firstName,
//         LName: this.RegistrationData.value.lastName,
//         Email: this.RegistrationData.value.email,
//         Mobile: this.RegistrationData.value.mobileNumber,
//         Password: this.RegistrationData.value.password
//       };
//       this.httpService.RegisterUser(formData).subscribe(
//         () => {
//           console.log("Registered successfully");
//           this.openSnackBar('Registration successfully done!');
//           this.dialogRef.close();
//           this.openRegistrationSuccessDialog();
//           this.RegistrationData.reset();

//         },
//         error => {
//           if (error.status === 409) {
//             this.emailExistsError = true;
//             this.openSnackBar("Email already exists.");
//           } else {
//             console.error('Error occurred:', error);
//             this.openSnackBar('Please try again later');
//           }
//         }
//       );
//     }
//   }

//   openRegistrationSuccessDialog(): void {
//     this.openDialog.open(RegistrationSuccessDialogComponent, {
//       data: { message: 'Registration success, please check your email. Thank you!' },

//       width: '400px', 
//       height: '300px',
//       disableClose: true, 
//       maxHeight: '90vh'
//     });
//   }

//   nameValidator(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const regex = /^[a-zA-Z\s]*$/;
//       return regex.test(control.value) ? null : { invalidName: true };
//     };
//   }

//   confirmPasswordValidator(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const password = this.RegistrationData ? this.RegistrationData.get('password').value : null;
//       const confirmPassword = control.value;
//       return password === confirmPassword ? null : { confirmPasswordMismatch: true };
//     };
//   }

//   passwordValidator(): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
//       return regex.test(control.value) ? null : { pattern: true };
//     };
//   }

//   openSnackBar(message: string) {
//     this.snackBar.open(message, 'Close', {
//       duration: 5000,
//       horizontalPosition: 'end',
//       verticalPosition: 'top'
//     });
//   }
// }




// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   constructor(private httpService: HttpService, private formBuilder: FormBuilder) {}
//   RegistrationData:any
//   ngOnInit() {
//     this.RegistrationData = this.formBuilder.group({
//       firstName: ['', [Validators.required, this.nameValidator()]],
//       lastName: ['', [Validators.required, this.nameValidator()]],
//       email: ['', [Validators.required, Validators.email]],
//       mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', [Validators.required]]
//     });
//   }

//   //registeredUsers: any[] = [];

//   Register() {
//     if (this.RegistrationData.valid) {
//       const formData = {
//         FName: this.RegistrationData.value.firstName,
//         LName: this.RegistrationData.value.lastName,
//         Email: this.RegistrationData.value.email,
//         Mobile: this.RegistrationData.value.mobileNumber,
//         Password: this.RegistrationData.value.password
//       };
//       this.httpService.RegisterUser(formData).subscribe(() => {
//         console.log("Registered successfully");
//         this.RegistrationData.reset();
//       }
//       );
//     }
//   }
//   nameValidator(): any {
//     return (control: FormControl) => {
//       const regex = /^[a-zA-Z\s]*$/;
//       return regex.test(control.value) ? null : { invalidName: true };
//     };
//   }
// }







































// import { Component, inject } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   httpservice=inject(HttpService)
//   RegistrationData = new FormGroup({
//     firstName: new FormControl('', [Validators.required, this.nameValidator()]),
//     lastName: new FormControl('', [Validators.required, this.nameValidator()]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     confirmPassword: new FormControl('', [Validators.required])
//   });

//   registeredUsers: any[] = [];

//   Register() {
//     if (this.RegistrationData.valid) {
//       this.registeredUsers.push(this.RegistrationData.value);
//       console.log('Form submitted:', this.RegistrationData.value);
//       console.log('Registered Users:', this.registeredUsers);
//       this.httpservice.RegisterUser(this.RegistrationData.value).subscribe(()=>{
//         console.log("Registerd successfully");
//       })
//       this.RegistrationData.reset();
//     } else {
//       console.log('Fill in all fields correctly.');
//     }
//   }

//   nameValidator(): any {
//     return (control: FormControl) => {
//       const regex = /^[a-zA-Z\s]*$/;
//       return regex.test(control.value) ? null : { invalidName: true };
//     };
//   }
// }


// function confirmPasswordValidator(formGroup: FormGroup) {
//   const password = formGroup.get('password')?.value;
//   const confirmPassword = formGroup.get('confirmPassword')?.value;
//   return password === confirmPassword ? null : { confirmPasswordMismatch: true };
// }



  // firstNameFormControl = new FormControl('', [Validators.required, this.nameValidator()]);
  // lastNameFormControl = new FormControl('', [Validators.required, this.nameValidator()]);
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // mobileNumberFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  // passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  // confirmPasswordFormControl = new FormControl('', [Validators.required, this.confirmPasswordValidator()]);

  // matcher: ErrorStateMatcher = new RegisterFormValidation();
  // registerData: any[] = [];

  // nameValidator(): any {
  //   return (control: FormControl) => {
  //     const regex = /^[a-zA-Z\s]*$/;
  //     if (!regex.test(control.value)) {
  //       return { invalidName: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  // confirmPasswordValidator(): any {
  //   return (control: FormControl) => {
  //     if (control.value !== this.passwordFormControl.value) {
  //       return { confirmPasswordMismatch: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  // Register() {
  //   if (this.firstNameFormControl.valid && this.lastNameFormControl.valid &&
  //       this.emailFormControl.valid && this.mobileNumberFormControl.valid &&
  //       this.passwordFormControl.valid && this.confirmPasswordFormControl.valid) {
  //     const formData = {
  //       firstName: this.firstNameFormControl.value,
  //       lastName: this.lastNameFormControl.value,
  //       email: this.emailFormControl.value,
  //       mobileNumber: this.mobileNumberFormControl.value,
  //       password: this.passwordFormControl.value
  //     };

  //     this.registerData.push(formData);
  //     console.log('Form Data:', formData);
  //     console.log('Register Data:', this.registerData);

  //     // Reset form after submitting
  //     this.firstNameFormControl.reset();
  //     this.lastNameFormControl.reset();
  //     this.emailFormControl.reset();
  //     this.mobileNumberFormControl.reset();
  //     this.passwordFormControl.reset();
  //     this.confirmPasswordFormControl.reset();
  //   } else {
  //     console.log('Form is invalid. Please fill in all fields correctly.');
  //   }
  // }


// export class RegisterFormValidation implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
