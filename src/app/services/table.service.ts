import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/location.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly width = 5;
  private readonly height = 5;
  private tableSubject$ = new BehaviorSubject<Location[]>([]);
  table$: Observable<Location[]> = this.tableSubject$.asObservable();

  initialize() {
    const table: Location[] = [];

    for (let row = 0; row < this.height; row++) {
      for (let colum = 0; colum < this.width; colum++) {
        table.push({ row, colum, isActive: false });
      }
    }

    this.tableSubject$.next(table);
  }
}
