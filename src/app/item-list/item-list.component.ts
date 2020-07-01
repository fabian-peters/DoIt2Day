import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
  currentDate = new Date();

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

  delete(item: Item) {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item).subscribe();
  }

  complete() {
    // TODO complete item (completed = true)
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%', // TODO min-width ca. 300px
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.itemService.updateItem(result); // TODO fix changing item even when 'cancel'
    });
  }

}
