import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
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

  constructor(
    private loginSvc: LoginService,
    private postSvc: PostService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.loginSvc.getUserId();

    this.userSvc
      .getUserById(userId)
      .pipe(
        tap((res: any) => {
          this.user = res.data.user[0];
        })
      )
      .subscribe();

    this.postSvc
      .getPostByUser(userId)
      .pipe(
        tap((res: any) => {
          console.log(res.data.posts);
          this.publicaciones = res.data.posts;
        })
      )
      .subscribe();
  }

  goBack(): void {
    window.history.back();
  }
}
