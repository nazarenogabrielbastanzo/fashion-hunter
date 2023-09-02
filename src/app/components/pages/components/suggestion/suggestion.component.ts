import { UserService } from '../../../../services/user.service';
import { tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

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
          })
        )
        .subscribe();
    } else {

      

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
