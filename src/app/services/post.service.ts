import { Injectable } from '@angular/core';
import { HttpConfigService } from './http-config.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsSource = new BehaviorSubject([]);
  posts$ = this.postsSource.asObservable();

  constructor(private httpSvc: HttpConfigService) {
    this.getPosts().pipe(
      tap((res: any) => {
        // console.log(res.data.resolvedPost);
        this.postsSource.next(res.data.resolvedPost);
      })
    ).subscribe();
  }

  createPost(formData: any): Observable<any> {
    return this.httpSvc
      .post<any>(`${environment.apiUrl}/posts`, formData, true);
  }

  getPosts(): Observable<any> {
    return this.httpSvc.get<any>(`${environment.apiUrl}/posts`, true);
  }

  getPostByUser(userId: string): Observable<any[]> {
    return this.httpSvc.get<any[]>(`${environment.apiUrl}/posts/userPost/${userId}`, true);
  }

  getFavoritePosts(): Observable<any[]> {
    return this.httpSvc.get<any[]>(`${environment.apiUrl}/posts/get-favorite-picture`, true);
  }

  addFavoritePost(postId: string): Observable<any> {
    return this.httpSvc.post<any>(`${environment.apiUrl}/posts/favorite-picture/${postId}`, {}, true);
  }
}
