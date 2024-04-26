import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoderService {
  public isloading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor() { }
}
