import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../../services/post.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-guardadas',
  templateUrl: './guardadas.component.html',
  styleUrls: ['./guardadas.component.css'],
})
export class GuardadasComponent implements OnInit {
  guardadas!: any[]

  constructor(
    private router: Router,
    private _title: Title,
    private postsSvc: PostService
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Fashion Hunter - Guardadas');
    this.postsSvc.getFavoritePosts().pipe(
      tap((res: any) => {
        // console.log(res);
        this.guardadas = res.data.favorites;
      })
    ).subscribe()
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
