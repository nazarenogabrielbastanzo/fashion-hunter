import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { delay, of, tap, mergeMap, zip, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionComponent } from '../components/crear-publicacion/crear-publicacion.component';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { Friend } from 'src/app/interfaces/friend.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  currentUser!: User;
  allUsers: User[] = [];

  // Todos los usuarios menos el actual
  otherUsers: User[] = [];

  // Los amigos que tiene el usuario actual
  friends: Friend[] = [];

  // Sugerencias de amistad son usuarios, aun no son amigos
  friendSuggestions: User[] = [];

  // TODO: replace with friendSuggestions array
  suggestions = [];

  oculto = true;
  numLikes!: number;
  notificationsHidden = true;
  private userId: string;

  constructor(
    private _title: Title,
    private loginSvc: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private userSvc: UserService,
  ) {
    this.userId = this.loginSvc.getUserId();

    this._title.setTitle('Fashion Hunter - Home');
  }

  ngOnInit(): void {
    // Get the friends of the current user.
    this.userSvc.getFriends()
      .pipe(
        tap((res: any) => {

        }),
      )
      .subscribe();

    // Get friend suggestions.
    const observablePattern = of(true).pipe(
      delay(2000),
      tap(() => {
        if (this.friendSuggestions.length === 0) {
          this.loadSuggestions();
        }
      })
    );

    observablePattern.subscribe();
  }

  loadSuggestions(): void {

    this.userSvc.getAllUsers()
      .pipe(
        tap((res: any) => {

          this.allUsers = res.data.users;

          this.otherUsers = this.allUsers.filter(user => user._id !== this.userId);

          this.friendSuggestions = this.otherUsers.slice(this.otherUsers.length - 5);

        })
      ).subscribe();
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

          dialogRef.afterClosed().subscribe((result) => { });
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
