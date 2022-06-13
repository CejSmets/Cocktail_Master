import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-popover-page',
  templateUrl: './popover-page.page.html',
  styleUrls: ['./popover-page.page.scss'],
})
export class PopoverPagePage implements OnInit {

  categories: string[] = [];
  alcoholContent: string;

  constructor(public popoverController: PopoverController, public apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getCategories().forEach(x => x.forEach(c => this.categories.push(c.strCategory)));
  }

  dismissPopover(data: string) {
    this.popoverController.dismiss(data);
  }

  setFilter(evt: any) {
    this.dismissPopover(evt.target.value);
  }

}
