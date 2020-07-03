import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() items: Item[] = [];
  currentDate = new Date();

  constructor() {
  }

  ngOnInit(): void {
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
