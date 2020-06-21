import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-up-next',
  templateUrl: './up-next.component.html',
  styleUrls: ['./up-next.component.css']
})
export class UpNextComponent implements OnInit {

  items: Item[];
  currentDate = new Date();

  constructor(
    private itemService: ItemService,
  ) {
  }

  ngOnInit(): void {
    // load top 3 items
    this.getTopItems();
  }

  getTopItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = this.selectTopItems(items));
  }

  selectTopItems(items: Item[]): Item[] {
    // TODO actually select top items based on criteria
    return items.slice(0, 3);
  }
}
