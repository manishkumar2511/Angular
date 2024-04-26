import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {  MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  StatesList: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh'
  ];
  studentForm: any;

  @Output() studentAdded = new EventEmitter<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    private snackBar: MatSnackBar,
    private _router: Router  ) { }

  ngOnInit() {
    this.studentForm = this._formBuilder.group({
      firstName: ['', [Validators.required, this.nameValidator()]],
      lastName: ['', [Validators.required, this.nameValidator()]],
      sEmail: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      DOB: ['', Validators.required],
      sMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['male', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      isRegular: [false]
    });
  }

  AddStudent() {
    
    if (this.studentForm.valid) {
      console.log("Form submitted successfully");
      console.log(this.studentForm.value);
      this._httpService.AddNewStudent(this.studentForm.value).subscribe(() => {
        console.log("New Student Added successfully");
        this.openSnackBar('New Student Added successfully');
        this.dialogRef.close();
        this.studentForm.reset();
        this.studentAdded.emit();
      });
    } else {
      console.log("Please fill in all required fields correctly.");
    }
  }
  // custom validation function
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(control.value) ? null : { invalidName: true };
    };
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '✅', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      // panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
