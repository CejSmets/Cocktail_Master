import { Component, OnInit, Input } from '@angular/core';
import {DrinkService} from '../../services/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../../datatypes/drink';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-drink-item',
  templateUrl: './drink-item.component.html',
  styleUrls: ['./drink-item.component.scss'],
})
export class DrinkItemComponent implements OnInit {

  @Input() drink: Drink;
  constructor(public modalService: ModalService, public drinkService: DrinkService,
              public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {}

}
