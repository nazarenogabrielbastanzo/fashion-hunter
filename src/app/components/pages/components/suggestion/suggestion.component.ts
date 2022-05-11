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

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {}

  toggleFriend(friendId: string): void {
    if (!this.siguiendo) {
      // The friend is added.
      this.userSvc
        .addFriend(friendId)
        .pipe(
          tap((res: any) => {
            console.log(res);
          }),
          tap(() => {
            this.siguiendo = !this.siguiendo;
          })
        )
        .subscribe();
    } else {
      // The friend should be removed.
      this.siguiendo = !this.siguiendo;
      return;
    }
  }
}
