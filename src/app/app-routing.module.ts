import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ResultComponent } from './components/result/result.component';
import { ContactComponent } from './components/contact/contact.component';
import { StudentdeskComponent } from './components/studentdesk/studentdesk.component';
import { AuthGuard } from './authGuards/auth.guard';
import { canActivateGuard, canDeActivateGuard } from './authGuards/AllGuards.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path:'pageNotFound', component:PagenotfoundComponent},
  { path:'unauthorized-access', component:AccessdeniedComponent},
  
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login-page', component: LoginComponent },
  { path: 'forget-Password', component: ForgetpasswordComponent  },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [canActivateGuard] }, //[canActivateGuard] it is my custom function in authGuard.ts
  { path: 'admission', component: AdmissionComponent, canActivate: [AuthGuard] }, // here AuthGuard is a service which implements the all Guard interfaces
  { path: 'studentDesk', component: StudentdeskComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate:[AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
  {
    path: 'contact',
    component: ContactComponent,
   // canActivate: [canActivateGuard],
    canDeactivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/pageNotFound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
