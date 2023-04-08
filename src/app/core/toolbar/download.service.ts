import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private readonly socket: Socket) {}

  public getNewMessage = (message: string) => {
    this.socket.on(message, (message: any) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
