import { Component, OnInit } from '@angular/core';
import { catchError, tap, of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../interfaces/user.interface';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  publicaciones!: any[];
  private userId: string;
  errorMessage!: string;

  constructor(
    private loginSvc: LoginService,
    private postSvc: PostService,
    private userSvc: UserService
  ) {
    this.userId = this.loginSvc.getUserId();
  }

  ngOnInit(): void {

    this.userSvc
      .getUserById(this.userId)
      .pipe(
        tap((res: any) => {
          this.user = res.data.user[0];
        })
      )
      .subscribe();

    this.postSvc
      .getPostByUser(this.userId)
      .pipe(
        tap((res: any) => {
          // console.log(res.data.posts);
          this.publicaciones = res.data.posts;
        }),
        catchError((error: any) => {
          if (error?.status === 404) {
            // console.log('No se encontro ningún post');
            this.errorMessage = 'No se encontro ningún post.';
          } else {
            // console.log('Error desconocido');
            this.errorMessage = 'Error desconocido.';
          }
          return of(-1);
        }),
      )
      .subscribe();
  }

  goBack(): void {
    window.history.back();
  }
}
