import { UserService } from '../../../../services/user.service';
import { BehaviorSubject, map, mergeMap, of, tap, zip } from 'rxjs';
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

  following = new BehaviorSubject<boolean>(false);
  following$ = this.following.asObservable();

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit(): void {

    // TODO: Aquí deberia ver si el amigo que sugiere esta en mi lista de amigos y cambiar la bandera 'siguiendo'

    this.loadFollowingState();

  }

  loadFollowingState() {
    this.userSvc.getFriends()
      .pipe(
        tap((resp: any) => {

          // friends
          const friends = resp.data.friends;

          const friendsAlsoSugessted = friends.filter((thatFriend: any) => thatFriend.username === this.suggestion.username);

          if (friendsAlsoSugessted.length) {
            this.following.next(true);
          }
        })
      ).subscribe();
  }

  addSuggestionAsFriend(suggestionId: string) {


    this.userSvc.addFriend(suggestionId)
      .pipe(
        tap((res: any) => {
        })
      )
      .subscribe();
  }

  removeSuggestionAsFriend(suggestionId: string) {


    this.userSvc.getUserById(suggestionId)
      .pipe(
        mergeMap((resp: any) => zip(of(resp), this.userSvc.getFriends())),
        map((resp: any) => {

          const friendToRemove = resp[1].data.friends.filter((friend: Friend) => friend.username === resp[0].data.user[0].username);

          this.userSvc.deleteFriend(friendToRemove[0]._id)
            .pipe(
              tap((resp: any) => {
              })
            ).subscribe()
        })
      ).subscribe();
  }

  toggleFriend(suggestionId: string): void {

    if (this.following.value === false) {

      // Add as friend
      this.addSuggestionAsFriend(suggestionId);

    } else {

      // Remove as friend
      this.removeSuggestionAsFriend(suggestionId);

    }

    // toggle
    this.following.next(!this.following.value);

  }
}

