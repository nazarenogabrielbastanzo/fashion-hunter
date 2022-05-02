import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpConfigService } from '../../../services/http-config.service';
import { delay, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionComponent } from '../components/crear-publicacion/crear-publicacion.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

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

  constructor(
    private _title: Title,
    private httpService: HttpConfigService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this._title.setTitle('Fashion Hunter - Home');

    const observablePattern = of(true).pipe(
      delay(2000),
      tap(() => {
        if (this.suggestions.length === 0) {
          this.loadSuggestions();
        }
      })
    );

    observablePattern.subscribe();

    const userId = this.loginService.getUserId();
    this.httpService
      .get<User>(`${environment.apiUrl}/user/${userId}`, true)
      .subscribe({
        next: (resp: any) => {
          this.currentUser = resp.data.user[0];
          // console.log(resp.data.user[0]);
        },
        error: (error) => {},
        complete: () => {},
      });
  }

  ngOnInit(): void {}

  loadSuggestions(): void {
    this.httpService
      .get<User[]>(`${environment.apiUrl}/user/all-users`, true)
      .subscribe({
        next: (resp: any) => {
          const allUsers = resp.data.users;
          const resultSuggestion = allUsers.filter((user: User) => {
            return user.username !== this.currentUser.username;
          });
          if (resultSuggestion.length > 5) {
            this.suggestions = resultSuggestion.slice(
              resultSuggestion.length - 5
            );
          } else {
            this.suggestions = resultSuggestion;
          }
        },
        error: (error) => {},
        complete: () => {},
      });
  }

  crearPublicacion() {
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      disableClose: false,
      data: { user: this.currentUser },
    });

    dialogRef.afterClosed().subscribe((result) => {});
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
