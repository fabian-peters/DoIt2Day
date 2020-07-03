import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-up-next',
  templateUrl: './up-next.component.html',
  styleUrls: ['./up-next.component.css']
})
export class UpNextComponent implements OnInit {

  @Input() items: Item[];
  @Output() itemsChange = new EventEmitter<Item[]>();
  currentDate = new Date();

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Mark items as complete and reload topItems
   */
  completeItem(item: Item) {
    item.completed = true;
    this.itemService.updateItem(item)
      .subscribe(() => {
        // share changes with parent
        this.itemsChange.emit(this.items);
      });
  }

  /**
   * Accessor for sorted list (to display top items)
   */
  get topItems(): Item[] {
    // if no/less than 3 items than no/all items are top items -> no filtering required
    if (this.items.length <= 3) {
      return this.items;
    }

    const topItems: Item[] = [];

    // 1. Get one 'urgent' item (longest overdue first)
    const topUrgentItem = this.getTopUrgentItem(topItems);
    if (topUrgentItem !== undefined) {
      topItems.push(topUrgentItem);
    }

    // 2. Get one 'important' item (longest overdue first)
    const topImportantItem = this.getTopImportantItem(topItems);
    if (topImportantItem !== undefined) {
      topItems.push(topImportantItem);
    }

    // 3. fill with items sorted by date (without adding duplicates)
    this.getItemsToFillTopItems(topItems).forEach(fillItem => topItems.push(fillItem));

    return topItems;
  }

  /**
   * Get the first (longest overdue/next) item marked as urgent.
   * Also filter the items to avoid returning items we already have.
   *
   * @param filterItems list of items which should not be returned
   */
  getTopUrgentItem(filterItems: Item[]): Item {
    // get sorted urgent items from all items
    let urgentItems = this.getSortedUrgentItems();

    // filter to avoid adding duplicates
    urgentItems = this.filterItems(urgentItems, filterItems);

    // return first item in sorted list
    return urgentItems[0];
  }

  /**
   * Get the first (longest overdue/next) item marked as important.
   * Also filter the items to avoid returning items we already have.
   *
   * @param filterItems list of items which should not be returned
   */
  getTopImportantItem(filterItems: Item[]): Item {
    // get sorted important items from all items
    let importantItems = this.getSortedImportantItems();

    // filter to avoid adding duplicates
    importantItems = this.filterItems(importantItems, filterItems);

    // return first item in sorted list
    return importantItems[0];
  }

  /**
   * Returns a list of items to be used to fill up the top items.
   *
   * @param topItems list of previous topItems to avoid duplicates
   */
  getItemsToFillTopItems(topItems: Item[]): Item[] {
    // get sorted items from all items
    // "filter" to avoid modifying this.items. TODO maybe rethink handling of arrays?
    let fillItems = this.sortItemsByDate(this.items.filter(() => true));

    // filter to avoid adding duplicates
    fillItems = this.filterItems(fillItems, topItems);

    // return first n=1..3 (depending on previous topItems) items in sorted list
    return fillItems.splice(0, 3 - topItems.length);
  }

  /**
   * Accessor for urgent items
   */
  getSortedUrgentItems(): Item[] {
    return this.sortItemsByDate(this.items.filter(item => item.urgent));
  }

  /**
   * Accessor for important items
   */
  getSortedImportantItems(): Item[] {
    return this.sortItemsByDate(this.items.filter(item => item.important));
  }

  /**
   * Sort items by targetDate.
   *
   * @param items list of items to sort
   */
  sortItemsByDate(items: Item[]): Item[] {
    return items.sort((a, b) => {
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
    });
  }

  /**
   * Filter specified items from a list of items.
   *
   * @param items the items filter from and return
   * @param filterItems the items to remove from the list of items
   * @return filtered list of items
   */
  filterItems(items: Item[], filterItems: Item[]): Item[] {
    filterItems.forEach(filterItem => {
      items = items.filter(item => item !== filterItem);
    });
    return items;
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%', // TODO min-width ca. 300px
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.itemService.updateItem(result)
        .subscribe(); // TODO fix changing item even when 'cancel'
    });
  }

}
