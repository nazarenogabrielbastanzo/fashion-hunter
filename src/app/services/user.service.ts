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

  // Get user:
  getUserById(userId: string): Observable<User> {
    return this.httpSvc.get<User>(`${environment.apiUrl}/user/${userId}`, true);
  }

  // Get users:
  getAllUsers(): Observable<User[]> {
    return this.httpSvc.get<User[]>(
      `${environment.apiUrl}/user/all-users`,
      true
    );
  }

  // Get friends (current user):
  getFriends(): Observable<User[]> {
    return this.httpSvc.get<User[]>(`${environment.apiUrl}/user/get-friends`, true);
  }

  // Add friend
  addFriend(friendId: string): Observable<User> {
    return this.httpSvc.post<User>(`${environment.apiUrl}/user/add-friend/${friendId}`, {}, true);
  }

  deleteFriend(friendId: string): Observable<User> {
    return this.httpSvc.delete<User>(`${environment.apiUrl}/user/delete-friend/${friendId}`, true);
  }
}
