import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TokenExpiredDialogComponent } from '../components/token-expired-dialog/token-expired-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public $refreshToken = new Subject<boolean>();
  
  apiurl ='https://localhost:7230/api';

  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    public router:Router
  ) {
  }

  UserLogin(LoginData: any): Observable<any> {
    return this._http.post(`${this.apiurl}/Login`, LoginData)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          localStorage.clear();
          this.router.navigateByUrl("/login-page");
        }
        return throwError(error);
      })
    );
  }

  openTokenExpiredDialog() {
    const dialogRef = this._dialog.open(TokenExpiredDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.refreshToken().subscribe(() => {
          
        }, (error) => {
          console.error('Failed to refresh token', error);
        });
      }
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('RefreshToken');
    return this._http.get(`${this.apiurl}/Login/RefreshToken?refreshToken=`+refreshToken)
      .pipe(
        catchError((error: any) => {
          console.error('Failed to refresh token:', error);
          return throwError('Failed to refresh token');
        }),
        tap((response: any) => {
          console.log('Refresh token response:', response);
        }),
        map((response: any) => {
          if (response && response.token) {
            localStorage.setItem('Token', response.token);
            return response.token;
          } else {
            throw new Error('Invalid token response');
          }
        })
      );
  }
  
  

  
    
  
  RegisterUser(RegisterFormData: any): Observable<any> {
    return this._http.post(this.apiurl+'/RegisterUser', RegisterFormData);
  }
  
  ForgetPassword(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<any>(`${this.apiurl}/RegisterUser/ForgetP`, { email }, httpOptions);
  }

  changePassword(userData:any):Observable<any>{
    return this._http.post(this.apiurl+'/RegisterUser/ChangePassword',userData)
  }


  AddNewStudent(StudentData: any): Observable<any> {
    return this._http.post(this.apiurl+'/AddNewStudent', StudentData);   
  }

  GetAllStudent(): Observable<any[]> {  
    return this._http.get<any[]>(this.apiurl+'/Student/allstudents');
  }

  GetStudentByID(ID: number): Observable<any> {
    return this._http.get<any>(this.apiurl + '/Student/GetStudentById/' + ID);
  }

  DeleteStudent(Id: number): Observable<any> {
    return this._http.delete(this.apiurl +'/Student/DeleteStudent/' + Id);
  }

  updateStudent(Id: number, StudentUpdatedData: any): Observable<any> {
    return this._http.put(this.apiurl+'/Student/UpdateStudent/' + Id, StudentUpdatedData);
  }
  
}
