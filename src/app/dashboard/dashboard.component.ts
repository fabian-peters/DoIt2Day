import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];

  constructor(
    private itemService: ItemService
  ) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  /**
   * Load (not completed) items from DB (via service).
   */
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items.filter(item => !item.completed));
  }

}
