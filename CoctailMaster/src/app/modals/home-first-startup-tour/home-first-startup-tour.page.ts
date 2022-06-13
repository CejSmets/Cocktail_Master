import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-home-bar-first-startup-tour',
  templateUrl: './home-first-startup-tour.page.html',
  styleUrls: ['./home-first-startup-tour.page.scss'],
})
export class HomeFirstStartupTourPage implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

}
