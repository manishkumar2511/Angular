import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  studentForm: any;
  @Output() studentUpdated = new EventEmitter<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    public dialogRef: MatDialogRef<UpdateStudentComponent>,
    private snackBar: MatSnackBar,
    private _router: Router,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
  
  ngOnInit() {
    this.populateData();
  }

   populateData() {
    this.studentForm = this._formBuilder.group({
      firstName: [this.data.firstName, [Validators.required]],
      lastName: [this.data.lastName, [Validators.required]],
      sEmail: [this.data.sEmail, [Validators.required, Validators.email]],
      course: [this.data.course, Validators.required],
      DOB: [this.data.dob, Validators.required],
      sMobile: [this.data.sMobile, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: [this.data.gender, Validators.required],
      state: [this.data.state, Validators.required],
      address: [this.data.address, Validators.required],
      isRegular: [this.data.isRegular]
    });
  }

  UpdateStudent() {
   
    if (this.studentForm.valid) {
     console.log("hii updatestudent method");
     this._httpService.updateStudent(this.data.id,this.studentForm.value).subscribe(
      ()=>{
        console.log("Record updated with id " +this.data.id);
        this.openSnackBar(' Student Record with  id '+ this.data.id+ ' ' +'is updated successfully');
        this.dialogRef.close();
        this.studentForm.reset();
        this.studentUpdated.emit();
      }
      );
    }
    else{
      console.log("Record Not Updated ")
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '✅', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
