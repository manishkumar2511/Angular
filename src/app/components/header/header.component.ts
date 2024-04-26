import { Component } from '@angular/core';
import { LoderService } from '../../services/loder.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  preserveWhitespaces:true
})
export class HeaderComponent {
  showLogoutButton: boolean = true;
  showWelcome:boolean=true;
  firstName:any=localStorage.getItem('FirstName');
  lastName:any=localStorage.getItem('LastName');
  LoggedInUser: any = `${this.firstName} ${this.lastName}`;

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    public loaderService:LoderService,) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = !['/', '/home','/forget-Password','/reset-password','/pageNotFound','/unauthorized-access'].includes(this.router.url);
        this.showWelcome=!['/','/home','/forget-Password','/reset-password'].includes(this.router.url);
      }
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('/home');
  }

  Admission(): void {
    this.router.navigateByUrl('/admission');
  }

  studentDesk(): void {
    this.router.navigateByUrl('/studentDesk');
  }
  courses(): void {
    this.router.navigateByUrl('/courses');
  }
  result(): void {
    this.router.navigateByUrl('/result');
  }
  gallery(): void {
    this.router.navigateByUrl('/gallery');
  }
  contact(): void {
    this.router.navigateByUrl('/contact');
  }

  logOut(): void {
    const dialogRef = this.dialog.open(LogoutPopupComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        localStorage.clear();
        this.router.navigateByUrl('/home');
      } else {
        window.location.reload();
      }
    });
  }
}

