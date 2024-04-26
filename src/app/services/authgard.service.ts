import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  private isAuthenticated = false;

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    this.isAuthenticated = !!token; 
    return this.isAuthenticated;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
