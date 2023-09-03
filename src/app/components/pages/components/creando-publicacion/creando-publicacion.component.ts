import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { tap, delay, mergeMap, zip, of, map } from 'rxjs';
import { PostService } from '../../../../services/post.service';

const formData = new FormData();

@Component({
  selector: 'app-creando-publicacion',
  templateUrl: './creando-publicacion.component.html',
  styleUrls: ['./creando-publicacion.component.css'],
})
export class CreandoPublicacionComponent implements OnInit {
  message: string = 'Subiendo...';
  progress: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CreandoPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private postSvc: PostService
  ) {
    formData.append('description', this.data.description);
    formData.append('postImg', this.data.foto);

    this.postSvc
      .createPost(formData)
      .pipe(
        tap(() => {
          this.progress = 100;
        }),
        delay(500),
        tap(() => {
          this.message = 'Listo!';
        }),
        delay(1000),
        mergeMap((res: any) => zip(of(res), this.postSvc.getPosts())),
        map((res: any) => {
          this.postSvc.postsSource.next(res[1].data.resolvedPost);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  goHome() {
    this.dialog.closeAll();
    // window.location.reload();
  }
}
