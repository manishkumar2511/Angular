import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private formBuilder: FormBuilder) {}
  
  public unsavedChanges = false; 

  public ContactUsData = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]], 
    Phone: ['', [Validators.required]]
  });

  contact():any {
    
    if (this.ContactUsData.valid) {
      console.log(this.ContactUsData.value);
      this.unsavedChanges = true; 
      return this.unsavedChanges
    }
  }
}
