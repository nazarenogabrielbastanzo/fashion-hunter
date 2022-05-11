import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostService } from '../../../../services/post.service';
import { Post } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postSvc: PostService) {
    this.posts$ = this.postSvc.posts$;
  }

  ngOnInit(): void {}
}
