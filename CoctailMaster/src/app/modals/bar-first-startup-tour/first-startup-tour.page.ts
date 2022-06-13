import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-bar-first-startup-tour',
  templateUrl: './first-startup-tour.page.html',
  styleUrls: ['./first-startup-tour.page.scss'],
})
export class FirstStartupTourPage implements OnInit {
  constructor(public modalService: ModalService) { }
  ngOnInit() {
  }
}
