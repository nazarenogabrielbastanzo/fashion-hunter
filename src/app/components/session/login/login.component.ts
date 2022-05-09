import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { UserLogin } from '../../../interfaces/user.interface';
import { BreakpointsService } from '../../../services/breakpoints.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLogin = {
    username: '',
    password: '',
  };
  currentScreenSize$: Observable<string>;

  constructor(
    private loginService: LoginService,
    public router: Router,
    private _title: Title,
    private breakpointsSvc: BreakpointsService
  ) {
    this.currentScreenSize$ = this.breakpointsSvc.currentScreenSize$;
  }

  ngOnInit(): void {
    this._title.setTitle('Fashion Hunter - Login');
  }

  // Login clásico

  login() {
    this.loginService.login(this.user)
      .subscribe({
        next: (resp: any) => {
          this.loginService.setToken(resp.token);
          this.loginService.setUserId(resp.userId);
          window.location.reload();
        }
      });
  }
}
