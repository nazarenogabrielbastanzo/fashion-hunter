import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpSvc: HttpConfigService
  ) { }

  getUserById(userId: string): Observable<User> {
    return this.httpSvc.get<User>(`${environment.apiUrl}/user/${userId}`, true)
  }
}
