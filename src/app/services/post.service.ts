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
        console.log(res.data.resolvedPost);
        this.postsSource.next(res.data.resolvedPost);
      })
    ).subscribe();
  }

  createPost(formData: any): Observable<any> {
    return this.httpSvc
      .post(`${environment.apiUrl}/posts`, formData, true);
  }

  getPosts(): Observable<any> {
    return this.httpSvc.get(`${environment.apiUrl}/posts`, true);
  }
}
