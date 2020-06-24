import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  items: Item[] = [];
  currentDate = new Date();

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  /**
   * Load items from DB (via service).
   * TODO avoid multiple DB request (also in other components)
   */
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  get numberOfUrgentItems(): number {
    return this.items.filter(item => item.urgent).length;
  }

  get numberOfImportantItems(): number {
    return this.items.filter(item => item.important).length;
  }

  get numberOfOverdueItems(): number {
    return this.items.filter(item => {
      const dueDate = new Date(item.targetDate);
      dueDate.setHours(0, 0, 0, 0); // only use days for comparison
      return dueDate <= this.currentDate;
    }).length;
  }

}
