import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../../services/post.service';
import { tap } from 'rxjs';
import * as moment from 'moment';
import { Post } from '../../../interfaces/post.interface';

@Component({
  selector: 'app-guardadas',
  templateUrl: './guardadas.component.html',
  styleUrls: ['./guardadas.component.css'],
})
export class GuardadasComponent implements OnInit {
  guardadas!: Post[];
  moment = moment;

  constructor(
    private router: Router,
    private _title: Title,
    private postsSvc: PostService
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this._title.setTitle('Fashion Hunter - Guardadas');
    this.postsSvc.getFavoritePosts().pipe(
      tap((res: any) => {
        const guardadas = res.data.favorites;
        this.guardadas = guardadas.reverse();
      })
    ).subscribe()
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
