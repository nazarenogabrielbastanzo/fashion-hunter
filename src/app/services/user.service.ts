import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpSvc: HttpConfigService) {}

  getUserById(userId: string): Observable<User> {
    return this.httpSvc.get<User>(`${environment.apiUrl}/user/${userId}`, true);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpSvc.get<User[]>(
      `${environment.apiUrl}/user/all-users`,
      true
    );
  }

  getFriends(): Observable<User[]> {
    return this.httpSvc.get<User[]>(`${environment.apiUrl}/user/get-friends`, true);
  }

  addFriend(friendId: string): Observable<User> {
    return this.httpSvc.post<User>(`${environment.apiUrl}/user/add-friend/${friendId}`, {}, true);
  }
}
