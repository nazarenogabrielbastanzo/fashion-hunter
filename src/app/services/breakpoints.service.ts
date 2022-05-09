import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  currentScreenSizeSource = new BehaviorSubject<string>('');
  currentScreenSize$ = this.currentScreenSizeSource.asObservable();

  constructor() { }
}
