import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-try-reconnect',
  templateUrl: './try-reconnect.component.html',
  styleUrls: ['./try-reconnect.component.scss'],
})
export class TryReconnectComponent implements OnInit {
  @Input() connected: boolean;
  @Input() loaded: boolean;
  @Output() reconnect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  onReconnect() {
    this.reconnect.emit();
  }
}
