import {EventEmitter, Injectable, NgZone} from '@angular/core';
import { Network } from '@capacitor/network';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  connected: boolean;
  isConnected: Observable<boolean>;
  private statusSubject = new BehaviorSubject<boolean>(false);
  constructor(private zone: NgZone) {
    Network.getStatus().then(status => this.statusSubject.next(status.connected));
    this.isConnected = this.statusSubject.asObservable();
    this.isConnected.subscribe(data => this.connected = data);

    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        this.statusSubject.next(status.connected);
      });
    });
    console.log(this.connected.valueOf());
  }
}
