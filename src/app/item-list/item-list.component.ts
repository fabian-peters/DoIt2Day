import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
  currentDate = new Date();

  showCompleted = false;
  filters = new FormControl();
  filterList: string[] = ['Overdue', 'Urgent', 'Important'];

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items.filter(item => this.checkFilter(item)));
  }

  checkFilter(item: Item): boolean {
    // check if completed should be shown
    if (!this.showCompleted && item.completed) {
      return false;
    }

    // show all if no filters are set
    if (this.filters.value == null) {
      return true;
    }

    // check other criteria
    let showItem = true;
    for (const filter of this.filters.value) {
      switch (filter) {
        case 'Overdue':
          const dueDate = new Date(item.targetDate);
          dueDate.setHours(0, 0, 0, 0); // only use days for comparison
          showItem = showItem && dueDate <= this.currentDate;
          break;
        case 'Urgent':
          showItem = showItem && item.urgent;
          break;
        case 'Important':
          showItem = showItem && item.important;
          break;
      }
    }
    return showItem;
  }

  delete(item: Item): void {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item)
      .subscribe();
  }

  completeItem(item: Item): void {
    this.itemService.updateItem(item)
      .subscribe();
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%', // TODO min-width ca. 300px
      // pass values manually to not change item outside of dialog TODO find better solution
      data: {
        id: item.id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        urgent: item.urgent,
        important: item.important,
        targetDate: item.targetDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // update only on 'save'
      if (result !== undefined && result !== '') {
        const index = this.items.indexOf(item);
        this.items[index] = result;

        this.itemService.updateItem(result)
          .subscribe();
      }
    });
  }

}
