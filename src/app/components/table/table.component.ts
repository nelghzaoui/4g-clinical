import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.interface';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  private width = 5;
  private height = 5;

  table: Array<Location> = [];

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    for (let row = 0; row < this.height; row++) {
      for (let colum = 0; colum < this.width; colum++) {
        this.table.push({ row, colum });
      }
    }
  }
}
