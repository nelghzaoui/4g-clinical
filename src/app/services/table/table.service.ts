import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableItem } from '../../models/table-item.class';

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly width = 5;
  private readonly height = 5;
  private tableItems: TableItem[][] = [];
  private tableItemsSubject$ = new BehaviorSubject<TableItem[][]>([]);
  tableItems$: Observable<TableItem[][]> =
    this.tableItemsSubject$.asObservable();

  initialize() {
    for (let r = 0; r < this.height; r++) {
      this.tableItems[r] = [];
      for (let c = 0; c < this.width; c++) {
        // Set the origin at the bottom left corner
        this.tableItems[r][c] = new TableItem(c, this.height - 1 - r, false);
      }
    }

    this.tableItemsSubject$.next(this.tableItems);
  }

  setActiveTableItem(x: number, y: number) {
    this.updateTableItem(x, y, true);
  }

  resetActiveTableItem(x: number, y: number) {
    this.updateTableItem(x, y, false);
  }

  private findTableItem(x: number, y: number): TableItem {
    const item = this.tableItems
      .flat()
      .find((item) => item.x === x && item.y === y);

    if (!item) {
      throw new Error('Table item not found');
    }

    return item;
  }

  private updateTableItem(x: number, y: number, isActive: boolean) {
    const item: TableItem = this.findTableItem(x, y);
    item.isActive = isActive;

    // Update the item in the array
    this.tableItemsSubject$.next(this.tableItems);
  }
}
