import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  userImg: any;
  nombreComnpleto: any;
  lastName: any;
  email: any;
  user!: User;

  constructor(
    private loginService: LoginService,
    private userSvc: UserService
  ) {
    const userId = this.loginService.getUserId();

    this.userSvc
      .getUserById(userId)
      .pipe(
        tap((res: any) => {
          this.user = res.data.user[0];
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  guardar() {
    /*
    userData.append("userImg", this.userImg);
    userData.append("firstName", this.firstName);
    userData.append("lastName", this.lastName);
    userData.append("username", this.username);
    userData.append("email", this.email);
    this.httpService
      .post(`${environment.apiUrl}/user/signup`, userData)
      .subscribe({
        next: (resp) => { },
        error: (error) => { },
        complete: () => {
          this.openDialog();
        }
      });
    */
  }
}
