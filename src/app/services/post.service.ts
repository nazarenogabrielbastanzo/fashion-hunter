import { Injectable } from '@angular/core';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpSvc: HttpConfigService
  ) { }

  createPost(formData: FormData): Observable<any> {
    return this.httpSvc.post(`${environment.apiUrl}/posts`, formData, true);
  }
}
