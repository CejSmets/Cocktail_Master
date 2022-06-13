import {Component, Input, OnInit} from '@angular/core';
import {DrinkComplete} from '../../../datatypes/drinkComplete';
import {DrinkService} from '../../services/drink.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss'],
})
export class DrinkDetailComponent implements OnInit {
  @Input() drink: DrinkComplete;
  constructor(public drinkService: DrinkService) { }

  ngOnInit() {}

}
