import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { TableItem } from 'table/models/table-item.class';

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly width = 5;
  private readonly height = 5;
  private tableItems: TableItem[][] = [];
  private tableItemsSubject$ = new BehaviorSubject<TableItem[][]>([]);
  tableItems$: Observable<TableItem[][]> =
    this.tableItemsSubject$.asObservable();
  private tableReadySource = new ReplaySubject(1);
  tableReady$ = this.tableReadySource.asObservable();

  initialize() {
    for (let x = this.height - 1; x >= 0; x--) {
      this.tableItems[x] = [];
      for (let y = 0; y < this.width; y++) {
        this.tableItems[x][y] = new TableItem(this.width - 1 - x, y, false);
      }
    }

    this.tableItemsSubject$.next(this.tableItems);
    this.tableReadySource.next(true);
  }

  setActiveTableItem(x: number, y: number) {
    const item: TableItem = this.findTableItem(x, y);
    item.isActive = true;
    this.tableItemsSubject$.next(this.tableItems);
  }

  resetActiveTableItem(x: number, y: number) {
    const item: TableItem = this.findTableItem(x, y);
    item.isActive = false;
    this.tableItemsSubject$.next(this.tableItems);
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
}
