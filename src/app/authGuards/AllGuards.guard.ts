import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthguardService } from '../services/authgard.service';
import { Injectable, inject } from '@angular/core';
import { ContactComponent } from '../components/contact/contact.component';

export const canActivateGuard: CanActivateFn = () => {
  const authservice=inject(AuthguardService);
  const router= inject(Router);
  if(authservice.isLoggedIn()){
    return true;
  }else{
    router.navigate(['/unauthorized-access']);
  }
  return true;
};

export const canDeActivateGuard: CanDeactivateFn<ContactComponent> = (Component:ContactComponent) => {
  // const authservice=inject(AuthguardService);
  const component=inject(ContactComponent);
  // const router= inject(Router);

  if (component.contact()) {
          return window.confirm('You have unsaved changes. Do you really want to leave?');
        }
  // if(authservice.isLoggedIn()){
  // }else{
  //   router.navigate(['/home']);
  // }
  return true;
};
