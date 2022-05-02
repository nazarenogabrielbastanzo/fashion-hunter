import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { environment } from 'src/environments/environment';
import { ModalCommentsComponent } from '../modal-comments/modal-comments.component';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;
  posts$!: Observable<any[]>;

  constructor(
    private postSvc: PostService
  ) {
    this.postSvc
      .getPosts()
      .pipe(
        tap((res: any) => {
          console.log(res.data.resolvedPost);
          this.posts = res.data.resolvedPost;
          // this.postSvc.postsSource.next(res.data.resolvedPost);
          this.posts$ = this.postSvc.posts$;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {

  }
}
