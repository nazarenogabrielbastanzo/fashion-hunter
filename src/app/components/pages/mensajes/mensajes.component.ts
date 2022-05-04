import { HttpConfigService } from './../../../services/http-config.service';
import { LoginService } from './../../../services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
})
export class MensajesComponent implements OnInit {
  @ViewChild('messagesBox')
  private myScrollContainer!: ElementRef;
  @ViewChild('inputMessage') private theInputMessage!: ElementRef;

  viewEmojis: boolean;
  message: string;
  user!: User;
  outcomingMessages: any[] = [];
  userImg!: string;
  private userId;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private httpService: HttpConfigService,
    private _title: Title
  ) {
    this.userId = this.loginService.getUserId();
    this._title.setTitle('Fashion Hunter - Mensajes');
    this.viewEmojis = false;
    this.message = '';
  }

  ngOnInit() {
    this.scrollToBottom();

    this.httpService
      .get<User>(`${environment.apiUrl}/user/${this.userId}`, true)
      .subscribe({
        next: (resp: any) => {
          this.user = resp.data.user[0];
        },
        error: (error) => {},
        complete: () => {},
      });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  addEmoji(event: any) {
    this.message += event.emoji.native;

    this.viewEmojis = false;
  }

  sendMessage(message: string) {

    this.httpService
      .get<User>(`${environment.apiUrl}/user/${this.userId}`, true)
      .subscribe({
        next: (resp: any) => {

          this.userImg = resp.data.user[0].img;
          const theMessage = {
            message,
            userImg: this.userImg,
          };

          this.outcomingMessages.push(theMessage);
          this.theInputMessage.nativeElement.value = '';
        },
        error: (error) => {},
        complete: () => {},
      });
  }
}
