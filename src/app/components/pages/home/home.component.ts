import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { delay, of, tap, mergeMap, zip, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionComponent } from '../components/crear-publicacion/crear-publicacion.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestions = [];
  currentUser!: User;
  oculto = true;
  numLikes!: number;
  notificationsHidden = true;
  private userId: string;

  constructor(
    private _title: Title,
    private loginSvc: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private userSvc: UserService
  ) {
    this.userId = this.loginSvc.getUserId();

    this._title.setTitle('Fashion Hunter - Home');
  }

  ngOnInit(): void {
    const observablePattern = of(true).pipe(
      delay(2000),
      tap(() => {
        if (this.suggestions.length === 0) {
          this.loadSuggestions();
        }
      })
    );

    observablePattern.subscribe();
  }

  loadSuggestions(): void {
    this.userSvc
      .getAllUsers()
      .pipe(
        mergeMap((res: any) =>
          zip(of(res), this.userSvc.getUserById(this.userId))
        ),
        map((res: any) => {
          // console.log(res);
          const allUsers = res[0].data.users;
          const resultSuggestion = allUsers.filter(
            (user: User) => user.username !== res[1].data.user[0].username
          );
          if (resultSuggestion.length > 5) {
            this.suggestions = resultSuggestion.slice(
              resultSuggestion.length - 5
            );
          } else {
            this.suggestions = resultSuggestion;
          }
        })
      )
      .subscribe();
  }

  crearPublicacion() {
    this.userSvc
      .getUserById(this.userId)
      .pipe(
        tap((res: any) => {
          const dialogRef = this.dialog.open(CrearPublicacionComponent, {
            disableClose: false,
            data: { user: res.data.user[0] },
          });

          dialogRef.afterClosed().subscribe((result) => {});
        })
      )
      .subscribe();
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  guardadas() {
    this.router.navigate(['/guardadas']);
  }

  mensajes() {
    this.router.navigate(['/mensajes']);
  }
}
