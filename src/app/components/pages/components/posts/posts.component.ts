import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<any[]>;

  constructor(private postSvc: PostService) {
    this.postSvc
      .getPosts()
      .pipe(
        tap((res: any) => {
          // console.log(res.data.resolvedPost);
          this.posts$ = this.postSvc.posts$;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
