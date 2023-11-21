import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableItem } from '../../models/table-item.class';
import { Table } from '../../models/table.class';
import { Location } from '../../models/location.class';

@Injectable({ providedIn: 'root' })
export class TableService {
  private table: Table;
  private tableItemsSubject$ = new BehaviorSubject<TableItem[][]>([]);
  tableItems$: Observable<TableItem[][]> = this.tableItemsSubject$.asObservable();

  constructor() {
    this.table = new Table(5, 5);
  }

  initialize() {
    this.tableItemsSubject$.next(this.table.tableItems);
  }

  isMoveForbidden(x: number, y: number): boolean {
    return this.table.isMoveForbidden(x, y);
  }

  simulateMovement(currentLocation: Location, nextLocation: Location) {
    this.updateTableItem(currentLocation.x, currentLocation.y, false);
    this.updateTableItem(nextLocation.x, nextLocation.y, true);
  }

  updateTableItem(x: number, y: number, isActive: boolean = false) {
    const items = this.table.updateTableItem(x, y, isActive);
    this.tableItemsSubject$.next(items);
  }

  hasLocation(x: number, y: number): boolean {
    return this.table.hasLocation({ x, y });
  }

  reset() {
    this.table.initialize();
    this.tableItemsSubject$.next(this.table.tableItems);
  }
}
