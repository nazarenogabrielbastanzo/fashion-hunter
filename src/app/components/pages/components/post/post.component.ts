import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as moment from 'moment';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalCommentsComponent } from '../modal-comments/modal-comments.component';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input() post!: any;
  moment: any = moment;
  likesSubject = new BehaviorSubject<number>(0);
  numLikes: any;

  constructor(
    private httpService: HttpConfigService,
    private dialog: MatDialog,
    private postSvc: PostService
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {}

  like(postId: string, likes: number) {
    this.httpService
      .patch(`${environment.apiUrl}/posts/like/${postId}`, {}, true)
      .pipe(
        tap((resp: any) => {
          // console.log(resp);
          const newLike =
            resp.data.post.numLikes > likes ? resp.data.post.numLikes : likes;
          this.likesSubject.next(newLike);
        })
      )
      .subscribe();
  }

  get likesAction$(): Observable<number> {
    return this.likesSubject.asObservable();
  }

  disLike(postId: string, likes: number) {
    this.httpService
      .delete(`${environment.apiUrl}/posts/like/${postId}`, true)
      .pipe(
        tap((resp: any) => {
          // console.log(resp);
          const newLike =
            resp.data.post.numLikes < likes ? resp.data.post.numLikes : likes;
          this.likesSubject.next(newLike);
        })
      )
      .subscribe();
  }

  newComment() {
    const dialogRef = this.dialog.open(ModalCommentsComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addToFavorites(postId: string): void {
    this.postSvc.addFavoritePost(postId)
      .pipe(
        tap((res: any) => {
          console.log(res);

        })
      )
      .subscribe();
  }
}
