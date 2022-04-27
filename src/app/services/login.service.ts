import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpConfigService } from './http-config.service';
import { UserLogin } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpService: HttpConfigService,
    private cookies: CookieService,
    private router: Router
  ) { }

  // Login
  login(user: UserLogin): Observable<UserLogin> {
    return this.httpService.post<UserLogin>(environment.apiUrl + '/user/login', user);
  }

  logOut() {
    this.cookies.delete('token');
    this.cookies.delete('userId');
    this.router.navigateByUrl('/login')
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  setUserId(id: string) {
    this.cookies.set('userId', id);
  }

  getUserId() {
    return this.cookies.get('userId');
  }

}
