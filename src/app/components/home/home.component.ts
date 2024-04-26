import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { MatDialog,} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _dialog:MatDialog){}
  OpenRegisterForm(){
    this._dialog.open(RegisterComponent);
  }

}
