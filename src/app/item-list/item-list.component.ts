import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  showDetails = false;



  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.itemService.addItem({title} as Item)
      .subscribe(item => {
        this.items.push(item);
      });

    // hide details again
    this.showDetails = false;
  }

  delete(item: Item) {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item).subscribe();
  }

  complete() {
    // TODO complete item (mark as completed and delete from server?
  }

  /**
   * Event handler for keystrokes in 'title' of new item.
   * Update {@code showDetails} to show/hide details of new item.
   *
   * @param text the text in the input field
   */
  onInputChange(text: string): void {
    this.showDetails = !(text == null || text === '');
  }
}
