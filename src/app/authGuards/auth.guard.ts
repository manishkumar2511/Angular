import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { AuthguardService } from '../services/authgard.service';
import { ContactComponent } from '../components/contact/contact.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad , CanDeactivate<ContactComponent>{
  constructor(private authService: AuthguardService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }
  canDeactivate(component: ContactComponent): boolean {
    if (component.contact()) {
      return window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }


  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    
    if (this.authService.isLoggedIn()) {
        debugger
      return true;
    } else {
      this.router.navigate(['/unauthorized-access']);
      return false;
    }
  }
}
