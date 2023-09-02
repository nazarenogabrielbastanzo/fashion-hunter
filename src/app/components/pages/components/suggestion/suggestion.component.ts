import { UserService } from '../../../../services/user.service';
import { map, mergeMap, of, tap, zip } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Friend } from 'src/app/interfaces/friend.interface';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionComponent implements OnInit {
  @Input() suggestion: any;
  siguiendo = false;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {

    console.log(this.suggestion);

    // TODO: Aquí deberia ver si el amigo que sugiere esta en mi lista de amigos y cambiar la bandera 'siguiendo'

  }

  toggleFriend(userId: string): void {

    // toggle
    this.siguiendo = !this.siguiendo;

    if (this.siguiendo === true) {

      // Add as friend
      this.userSvc.addFriend(userId)
        .pipe(
          tap((res: any) => {

            console.log(res);

            // TODO: despues de un tiempo que desaparezca el amigo agregado
          })
        )
        .subscribe();
    } else {

      this.userSvc.getUserById(userId)
        .pipe(
          mergeMap((resp: any) => zip(of(resp), this.userSvc.getFriends())),
          map((resp: any) => {
            console.log(resp);

            const friendToRemove = resp[1].data.friends.filter((friend: Friend) => friend.username === resp[0].data.user[0].username);
            console.log(friendToRemove);

            this.userSvc.deleteFriend(friendToRemove[0]._id)
              .pipe(
                tap((resp: any) => {
                  console.log(resp);

                })
              ).subscribe()
          })
        ).subscribe();

      // The friend should be removed
      // this.userSvc.deleteFriend(friendId)
      //   .pipe(
      //     tap((res: any) => {

      //       console.log(res);
      //     })
      //   ).subscribe();

      // this.siguiendo = !this.siguiendo;
      // return;
    }
  }
}
