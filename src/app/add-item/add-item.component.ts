import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  newItem: Item = AddItemComponent.createDefaultItem();

  constructor(
    private itemService: ItemService
  ) { }

  private static createDefaultItem(): Item {
    return {
      title: '',
      description: '',
      completed: false,
      urgent: false,
      important: false,
      targetDate: new Date()
    } as Item;
  }

  ngOnInit(): void {
  }

  addItem(): void {
    // trim inputs
    this.newItem.title = this.newItem.title.trim();
    this.newItem.description = this.newItem.description.trim();

    // validate inputs
    if (!this.newItem.title) { return; } // title must not be empty
    if (!this.newItem.targetDate) { this.newItem.targetDate = new Date(); } // use today if due date is not specified

    // save item to db
    this.itemService.addItem(this.newItem)
      .subscribe(item => {
        /* TODO fix: add to local items for display --> this.items.push(item);
                     or show in Up next? */
      });

    // reset newItem
    this.newItem = AddItemComponent.createDefaultItem();
  }

}
