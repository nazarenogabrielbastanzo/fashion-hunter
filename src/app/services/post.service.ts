import { Injectable } from '@angular/core';
import { HttpConfigService } from './http-config.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsSource = new BehaviorSubject([]);
  posts$ = this.postsSource.asObservable();

  constructor(private httpSvc: HttpConfigService) {
    this.getPosts()
      .pipe(
        tap((res: any) => {
          // console.log(res.data.resolvedPost);
          this.postsSource.next(res.data.resolvedPost);
        })
      )
      .subscribe();
  }

  createPost(formData: any): Observable<Post> {
    return this.httpSvc.post<Post>(
      `${environment.apiUrl}/posts`,
      formData,
      true
    );
  }

  getPosts(): Observable<Post[]> {
    return this.httpSvc.get<Post[]>(`${environment.apiUrl}/posts`, true);
  }

  getPostByUser(userId: string): Observable<Post[]> {
    return this.httpSvc.get<Post[]>(
      `${environment.apiUrl}/posts/userPost/${userId}`,
      true
    );
  }

  getFavoritePosts(): Observable<Post[]> {
    return this.httpSvc.get<Post[]>(
      `${environment.apiUrl}/posts/get-favorite-picture`,
      true
    );
  }

  addFavoritePost(postId: string): Observable<Post> {
    return this.httpSvc.post<Post>(
      `${environment.apiUrl}/posts/favorite-picture/${postId}`,
      {},
      true
    );
  }

  updateLikes(postId: string): Observable<Post> {
    return this.httpSvc.patch<Post>(
      `${environment.apiUrl}/posts/like/${postId}`,
      {},
      true
    );
  }
}
