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
    for (let x = 0; x < this.height; x++) {
      this.tableItems[x] = [];
      for (let y = 0; y < this.width; y++) {
        this.tableItems[x][y] = new TableItem(x, y, false);
      }
    }

    this.tableItemsSubject$.next(this.tableItems);
    this.tableReadySource.next(true);
  }

  setActiveTableItem(x: number, y: number) {
    this.tableItems[x][y].isActive = true;
    this.tableItemsSubject$.next(this.tableItems);
  }

  resetActiveTableItem(x: number, y: number) {
    this.tableItems[x][y].isActive = false;

    this.tableItemsSubject$.next(this.tableItems);
  }
}
