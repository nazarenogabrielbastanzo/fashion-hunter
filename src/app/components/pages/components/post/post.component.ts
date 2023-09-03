import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import * as moment from 'moment';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalCommentsComponent } from '../modal-comments/modal-comments.component';
import { PostService } from '../../../../services/post.service';
import { Post } from '../../../../interfaces/post.interface';
import { Dialog3Component } from 'src/app/modules/shared/dialog3/dialog3.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  
  moment = moment;

  likes = new BehaviorSubject<number>(0);
  likes$ = this.likes.asObservable();

  postSaved = new BehaviorSubject<boolean>(false);
  postSaved$ = this.postSaved.asObservable();

  favorites: any;

  constructor(
    private httpService: HttpConfigService,
    private dialog: MatDialog,
    private postSvc: PostService
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.postSvc.getFavoritePosts()
      .pipe(
        tap((resp: any) => {

          this.favorites = resp.data.favorites;

          const favorite = this.favorites.filter((fav: any) => fav.image === this.post.image);

          this.postSaved.next(favorite.length ? true : false);
        })
      ).subscribe();

      this.likes.next(this.post.numLikes);
  }

  like(postId: string, likes: number) {
    this.postSvc
      .updateLikes(postId)
      .pipe(
        tap((resp: any) => {
          const newLike =
            resp.data.post.numLikes > likes ? resp.data.post.numLikes : likes;
          this.likes.next(newLike);
        })
      )
      .subscribe({
        error: (err: any) => {
          this.dialog.open(Dialog3Component, {
            data: {
              message: err.error.message
            }
          });
        }
      });
  }

  disLike(postId: string, likes: number) {
    this.httpService
      .delete(`${environment.apiUrl}/posts/like/${postId}`, true)
      .pipe(
        tap((resp: any) => {
          const newLike =
            resp.data.post.numLikes < likes ? resp.data.post.numLikes : likes;
          this.likes.next(newLike);
        })
      )
      .subscribe({
        error: (err: any) => {
          this.dialog.open(Dialog3Component, {
            data: {
              message: err.error.message
            }
          });
        }
      });
  }

  newComment() {
    const dialogRef = this.dialog.open(ModalCommentsComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addToFavorites(postId: string): void {
    this.postSvc
      .addFavoritePost(postId)
      .pipe(
        tap((res: any) => {
        })
      )
      .subscribe({
        complete: () => {
          this.postSaved.next(true);
        }
      });
  }
}
