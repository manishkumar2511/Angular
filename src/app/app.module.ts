import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { TokenExpiredDialogComponent } from './components/token-expired-dialog/token-expired-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { RegistrationSuccessDialogComponent } from './components/registration-success-dialog/registration-success-dialog.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoderInterceptorService } from './services/loder-interceptor.service'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdmissionComponent } from './components/admission/admission.component';
import {MatBadgeModule} from '@angular/material/badge';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LogoutPopupComponent } from './components/logout-popup/logout-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentdeskComponent } from './components/studentdesk/studentdesk.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ResultComponent } from './components/result/result.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import {canActivateGuard,canDeActivateGuard } from '../app/authGuards/AllGuards.guard'
import { AuthGuard } from './authGuards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider ,SocialAuthService} from 'angularx-social-login';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddStudentComponent,
    StudentDashboardComponent,
    UpdateStudentComponent, 
    DialogBoxComponent, 
     TokenExpiredDialogComponent,
     ForgetpasswordComponent,
     RegistrationSuccessDialogComponent,
     ResetPasswordComponent,
     AdmissionComponent,
     LogoutPopupComponent,
     HeaderComponent,
     StudentdeskComponent,
     CoursesComponent,
     ResultComponent,
     GalleryComponent,
     ContactComponent,
     FooterComponent,
     PagenotfoundComponent,
     AccessdeniedComponent
     
     
     
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule ,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule, 
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatSortModule,
    DatePipe,
    ToastrModule.forRoot(),
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    //SocialLoginModule,
   // GoogleLoginProvider,
    
    
  ],
  providers: [
    DatePipe,
    AuthGuard,
   // SocialAuthService,
    //GoogleLoginProvider,
    

    
    StudentDashboardComponent,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true } ,
    { provide: HTTP_INTERCEPTORS, useClass: LoderInterceptorService, multi: true },

    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('clientId') // Replace 'clientId' with your actual Google client ID
    //       },
    //       // {
    //       //   id: FacebookLoginProvider.PROVIDER_ID,
    //       //   provider: new FacebookLoginProvider('clientId') // Replace 'clientId' with your actual Facebook client ID
    //       // }
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // }
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
