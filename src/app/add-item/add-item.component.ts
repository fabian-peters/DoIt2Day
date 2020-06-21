import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  showDetails = false;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.itemService.addItem({title} as Item)
      .subscribe(item => {
        // TODO fix: add to local items for display --> this.items.push(item);
      });

    // hide details again
    this.showDetails = false;
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
