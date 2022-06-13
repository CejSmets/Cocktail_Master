import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-shop-first-startup-tour',
  templateUrl: './shop-first-startup-tour.page.html',
  styleUrls: ['./shop-first-startup-tour.page.scss'],
})
export class ShopFirstStartupTourPage implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

}
