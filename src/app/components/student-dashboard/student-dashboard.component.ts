import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { HttpService } from '../../services/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

 
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  preserveWhitespaces: true
})
export class StudentDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(StudentDashboardComponent) studentDashboard?: StudentDashboardComponent; 

  constructor(
    private _dialog: MatDialog,
    private _httpService: HttpService,
    private _DatePipe: DatePipe,
    private _router: Router,
    private snackBar: MatSnackBar,
  ) { }

  StudentList!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'sEmail',
    'sMobile',
    'dob',
    'gender',
    'course',
    'admissionDate',
    'address',
    'actions'
  ];

  ngOnInit() {
    this.GetStudentList();  
  }

  OpenAddStudentForm() {
    const dialogRef = this._dialog.open(AddStudentComponent);

    dialogRef.componentInstance.studentAdded.subscribe(() => {
      this.GetStudentList();
    });
  }

  OpenUpdateStudentForm(data: any) {
   const dialogRef= this._dialog.open(UpdateStudentComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: data 
    });

    dialogRef.componentInstance.studentUpdated.subscribe(()=>{
      this.GetStudentList();
    })
  }

  EditStudent(id: number) {
    this._httpService.GetStudentByID(id).subscribe(
      (data: any) => {
        console.log("Searched Record :", data);
        this.OpenUpdateStudentForm(data);
      },
    );
  }

  DeleteStudent(id: number) {
    if (id != null) {
      const dialogRef = this._dialog.open(DialogBoxComponent, {
        data: 'Are you sure you want to delete this student?',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '500ms',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._httpService.DeleteStudent(id).subscribe((data: any) => {
            console.log("Record deleted ");
            this.openSnackBar('Student with id ' + ' ' + id + ' deleted successfully');
            this.GetStudentList();
          });
        }
      });
    }
  }

  GetStudentList() {
    
    this._httpService.GetAllStudent().subscribe(StudentData => {
      if(StudentData?.length >0){
        this.StudentList = new MatTableDataSource<any>(StudentData);
        this.StudentList.paginator = this.paginator;
        this.StudentList.sort = this.sort;
      }
    
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StudentList.filter = filterValue.trim().toLowerCase();

    if (this.StudentList.paginator) {
      this.StudentList.paginator.firstPage();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '❌', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snack-bar-container-accent']
    });
  }
  sticker:any='😐';
}
